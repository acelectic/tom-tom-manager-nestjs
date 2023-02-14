import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ForgotPasswordParamsDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class ForgotPasswordResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string
}
