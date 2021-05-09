import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { validateForbidden } from '../response-error'
import chalk from 'chalk'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')
  log = (...args) => this.logger.log(chalk.magenta(...args))

  use(request: any, response: any, next: NextFunction): void {
    console.log('=== reqest ===', request)

    response.on('close', () => {
      const { statusCode, statusMessage } = response
      // const contentLength = response.get('content-length')

      const { body, ip, authInfo } = request
      const userAgent = request.get('user-agent') || ''
      const requestUrl = `[${request.method}] ${request.protocol}://${request.get('host')}${
        request.originalUrl
      }`

      // this.log(
      //   '---------------------------------------------------------------------------------',
      // )
      // if (authInfo) this.log('authInfo: ', authInfo.message)
      // this.log('request url: ', requestUrl)
      // this.log('request body: ', JSON.stringify(body))
      // this.log('request userAgent: ', `${userAgent} ${ip}`)
      // this.log('request statusCode: ', statusCode)
      // this.log('request statusMessage: ', statusMessage)
      // this.log(
      //   '---------------------------------------------------------------------------------',
      // )
    })

    next()
  }
}
