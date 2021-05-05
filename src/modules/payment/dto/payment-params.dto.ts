import { ApiProperty } from '@nestjs/swagger'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  ValidateIf,
} from 'class-validator'
import { PaymentType } from 'src/db/entities/Payment'

export class CreatePaymentParamsDto {
  @ApiProperty()
  @Min(0)
  @Max(30000)
  @IsNumber()
  price: number

  @ApiProperty()
  @IsUUID('all')
  userId: string

  @ApiProperty()
  @IsEnum(PaymentType, {
    each: true,
  })
  @IsNotEmpty()
  type: PaymentType

  @ApiProperty()
  @IsUUID('all')
  @ValidateIf(o => o.type === PaymentType.BUY)
  resourceId: string

  @ApiProperty()
  @IsUUID('all')
  @ValidateIf(o => o.type === PaymentType.PAID)
  transactionId: string
}
