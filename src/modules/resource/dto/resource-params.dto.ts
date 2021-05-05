import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString, Length, Max, Min } from 'class-validator'

export class CreateReourceParamsDto {
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
