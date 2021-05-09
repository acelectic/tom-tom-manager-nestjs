import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class getOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobileNo: string
}

export class sendOtpRequest {
  @IsNotEmpty()
  @IsString()
  key: string

  @IsNotEmpty()
  @IsString()
  secret: string

  @IsNotEmpty()
  @IsString()
  msisdn: string
}
