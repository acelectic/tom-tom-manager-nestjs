import { ApiProperty } from '@nestjs/swagger'
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
  @Min(0)
  @Max(30000)
  @IsNumber()
  price: number

  @ApiProperty()
  @IsUUID('all', {
    each: true,
  })
  @ArrayMaxSize(6)
  @ArrayMinSize(1)
  @IsArray()
  userIds: string[]

  @ApiProperty()
  @IsUUID('all', {
    each: true,
  })
  @ArrayMaxSize(6)
  @ArrayMinSize(1)
  @IsArray()
  resourceIds: string[]

  @ApiProperty()
  @Length(1, 200)
  @IsString()
  @IsOptional()
  detail?: string
}

export class GetTransactionParamsDto {
  @ApiProperty()
  @IsUUID('all', {
    each: true,
  })
  @IsOptional()
  userId?: string
}
