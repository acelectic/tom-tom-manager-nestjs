import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator'

export class CreateTransactionParamsDto {
  @ApiProperty()
  @IsUUID('all', {
    each: true,
  })
  @ArrayMaxSize(6)
  @ArrayMinSize(1)
  @IsArray()
  userIds: string[]

  @ApiProperty()
  @IsUUID()
  templateId: string
}

export class GetTransactionParamsDto {
  @ApiProperty()
  @IsUUID('all', {
    each: true,
  })
  @IsOptional()
  userId?: string
}
