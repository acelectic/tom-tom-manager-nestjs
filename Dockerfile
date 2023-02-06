FROM node:18.8.0-alpine as builder

# curl needed to display Heroku release logs
RUN apk --no-cache add curl

WORKDIR /app

COPY --chown=node:node package.json yarn.lock  ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

# build and remove development dependencies
RUN yarn build && yarn install --production

# run node prune
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune

# Use the node user from the image (instead of the root user)
USER node

FROM node:18.8.0-alpine as production

ENV NODE_ENV=production

WORKDIR /app

RUN apk add --no-cache tzdata 

COPY --chown=node:node --from=builder /app/package.json ./
COPY --chown=node:node --from=builder /app/yarn.lock ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules/

COPY --chown=node:node --from=builder /app/dist ./dist/
COPY --chown=node:node --from=builder /app/public/ ./public/
# COPY --chown=node:node --from=builder /app/private/ ./private/
COPY --chown=node:node --from=builder /app/src/config/ ./src/config/
COPY --chown=node:node --from=builder /app/src/db/ ./src/db/

COPY --chown=node:node --from=builder /app/ormconfig.ts ./

CMD ["node", "dist/main"]