import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
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
  @IsUUID()
  @IsOptional()
  userId?: string

  @ApiProperty()
  @Transform(({ value }) => (value === undefined ? undefined : value === 'true'))
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean
}

export class GetTransactionHistoryParamsDto {
  @ApiProperty()
  @Type(() => Dayjs)
  // @IsDateString()
  @Transform(({ value }) => dayjs(value))
  @IsOptional()
  startDate?: Dayjs

  @ApiProperty()
  @Type(() => Dayjs)
  // @IsDateString()
  @Transform(({ value }) => dayjs(value))
  @IsOptional()
  endDate?: Dayjs

  @ApiProperty()
  @Transform(({ value }) => (value === 'true' ? true : value === 'false' ? false : undefined))
  @IsOptional()
  status?: boolean

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  userId?: string
}
