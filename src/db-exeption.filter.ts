import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'
import { Response } from 'express'

@Catch(QueryFailedError)
export class DbExeptionFilter implements DbExeptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp()

    const response = context.getResponse<Response>()
    const { message } = exception
    if (message.includes('duplicate key')) {
      const status = HttpStatus.UNPROCESSABLE_ENTITY
      response.status(status).json({
        status,
        message,
        error: HttpStatus[status],
      })
    }
  }
}
