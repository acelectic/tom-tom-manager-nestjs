import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator'

export class CreateResourceParamsDto {
  @ApiProperty()
  @Length(1, 100)
  @IsString()
  name: string

  @ApiProperty()
  @Min(0)
  @Max(30000)
  @IsNumber()
  price: number
}

export class GetResourcesParamsDto {
  @ApiProperty()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean
}

export class UpdateResourceIsActiveParamsDto {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean
}
