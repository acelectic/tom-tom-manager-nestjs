import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export const httpError = (
  statusCode: HttpStatus,
  errorCode?: string,
  messages?: ValidationError[],
) => {
  console.log({ statusCode, errorCode })
  let message = undefined
  let params = undefined

  if (messages) {
    message = messages[0].constraints
  }

  if (process.env.NODE_ENV !== 'production') {
    params = {
      statusCode,
      errorCode,
      message,
      error: HttpStatus[statusCode],
    }
  } else {
    params = {
      statusCode,
      errorCode,
      error: HttpStatus[statusCode],
    }
  }

  throw new HttpException({ ...params }, statusCode)
}

export const notFound = (message?: string) => {
  httpError(HttpStatus.NOT_FOUND, message)
}

export const validateError = (message?: string) => {
  httpError(HttpStatus.UNPROCESSABLE_ENTITY, message)
}

export const validateForbidden = (message?: string) => {
  httpError(HttpStatus.FORBIDDEN, message)
}

export const validateBadRequest = (message?: ValidationError[]) => {
  httpError(HttpStatus.BAD_REQUEST, '400-003', message)
}
