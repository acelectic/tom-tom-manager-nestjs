import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber, IsNumberString, IsOptional } from 'class-validator'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'

export class BasePaginateParamsDto implements Partial<IPaginationOptions> {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  limit?: number

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  page?: number
}
