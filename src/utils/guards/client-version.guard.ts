import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common'
import { Request } from 'express'
import semver from 'semver'
import { appConfig } from 'src/config/app-config'
import { httpError } from '../response-error'

@Injectable()
export class ClientVersionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const clientVersion = request.header('App-Version').toString()
    const validRange = semver.validRange(appConfig.ALLOW_MIN_CLIENT_VERSION)
    const isAllowed = semver.satisfies(clientVersion, appConfig.ALLOW_MIN_CLIENT_VERSION) // true

    if (!isAllowed) {
      httpError(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, 'App Version not allow: ' + validRange)
    }

    return true
  }
}
