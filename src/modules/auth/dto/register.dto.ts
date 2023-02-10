import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsEmail, IsOptional, ValidateNested } from 'class-validator'
import { SignInEmailDto } from './sign-in.dto'
import { User } from 'src/db/entities/User'

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

export class RegisterEmailParamsDto {
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

export class RegisterEmailResponseDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => User)
  @IsNotEmpty()
  user: User

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string
}
