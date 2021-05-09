import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsBooleanString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator'

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
