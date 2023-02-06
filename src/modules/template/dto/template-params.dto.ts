import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { isString } from 'lodash'

export class GetTemplatesParamsDto {
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsIn(['true', 'false', true, false])
  @IsOptional()
  isActive?: boolean
}

export class CreateTemplateParamsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty()
  @IsUUID('all', {
    each: true,
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  @IsNotEmpty()
  resourceIds: string[]

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}

export class UpdateTemplateParamsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string

  @ApiProperty()
  @IsUUID('all', {
    each: true,
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(6)
  @IsOptional()
  resourceIds?: string[]

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}

export class UpdateTemplateIsActiveParamsDto {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean
}
