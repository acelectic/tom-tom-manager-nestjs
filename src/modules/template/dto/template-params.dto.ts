import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator'

export class GetTemplatesParamsDto {
  @ApiProperty()
  @IsBoolean()
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
