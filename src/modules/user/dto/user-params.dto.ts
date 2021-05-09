import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsString,
  IsEmail,
  IsIn,
  IsEnum,
  IsUUID,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { Role } from 'src/modules/auth/auth.constant'
import { BasePaginateParamsDto } from 'src/modules/dto/base.dto'

export class UploadImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  image: string
}

export class GetUsersParamsDto extends BasePaginateParamsDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  transactionId?: string
}

export class SearchUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  limit?: number

  @ApiProperty({ required: false })
  @IsOptional()
  page?: number

  @ApiProperty({ required: false })
  @IsOptional()
  q?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsIn(
    ['email', 'firstnameTh', 'lastnameTh', 'firstnameEn', 'lastnameEn', 'mobileNo', 'citizenId'],
    { each: true },
  )
  filter?: string[]
}

export class UpdateEmailUserFacebookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string
}

export class UpdateAcceptTermDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  version: number
}

export class UpdateMobileNoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobileNo: string
}

export class ChangeRoleDto {
  @ApiProperty()
  @IsEnum(Role)
  @IsIn(Object.values(Role))
  @IsNotEmpty()
  role: Role
}

export class UpdateUserDto {
  // @ApiProperty()
  // @IsString()
  // @IsEmail()
  // @Transform(({ value }) => value.toLowerCase())
  // @IsOptional()
  // email: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string

  @ApiProperty()
  @IsEnum(Role)
  @IsIn(Object.values(Role))
  @IsOptional()
  role: Role
}
