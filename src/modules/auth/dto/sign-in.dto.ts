import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail } from 'class-validator'
import { Transform } from 'class-transformer'

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobileNo: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pin: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceToken: string
}

export class SignInGoogleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceToken: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authToken: string
}

export class SignInFacebookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceToken: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authToken: string
}

export class SignInEmailDto {
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
}

export class SignInEmailInternalDto {
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
}

export class UpdateForgotPasswordDto {
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsString()
  // @IsEmail()
  // @Transform(({ value }) => value.toLowerCase())
  // email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  oldPassword: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string
}

export class SignInAppleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  deviceToken: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  authToken
}
