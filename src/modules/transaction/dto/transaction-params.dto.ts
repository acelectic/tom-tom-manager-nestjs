import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsUUID,
} from 'class-validator'
import dayjs, { Dayjs } from 'dayjs'
import { BasePaginateParamsDto } from 'src/modules/dto/base.dto'

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

export class GetTransactionParamsDto extends BasePaginateParamsDto {
  @ApiProperty()
  @IsUUID('all', {
    each: true,
  })
  @IsOptional()
  userId?: string
}

export class GetTransactionHistoryParamsDto {
  @ApiProperty()
  @Type(() => Dayjs)
  @Transform(({ value }) => dayjs(value))
  @IsDateString()
  @IsOptional()
  startDate?: Dayjs

  @ApiProperty()
  @Type(() => Dayjs)
  @Transform(({ value }) => dayjs(value))
  @IsDateString()
  @IsOptional()
  endDate?: Dayjs

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsOptional()
  status?: boolean

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  userId?: string
}
