import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { validateError, validateForbidden } from '../response-error'

@Injectable()
export class VersionMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const appVersion = Number(request.headers['app-version'])
    // if (
    //   request.headers['app-version'] === undefined ||
    //   appVersion < Number(process.env.APP_VERSION)
    // ) {
    //   validateError("API can't support ")
    // }

    next()
  }
}
