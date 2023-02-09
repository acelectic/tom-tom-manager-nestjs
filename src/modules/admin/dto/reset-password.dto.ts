import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'
import { Transform } from 'class-transformer'

export class AdminResetPasswordParamsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string
}

export class AdminResetPasswordResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}
