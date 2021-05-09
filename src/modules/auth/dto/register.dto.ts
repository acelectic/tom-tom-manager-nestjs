import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator'
import { SignInEmailDto } from './sign-in.dto'

export class VerifyEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string
}

export class VerifyMobilelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobileNo: string
}

export class ParamsRegisterEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string
}
