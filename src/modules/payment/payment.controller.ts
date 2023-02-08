import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import { PaymentService } from './payment.service'
import {
  ConfirmPaymentParamsDto,
  ConfirmUserAllPaymentParamsDto,
  CreatePaymentParamsDto,
  GetPaymentsParamsDto,
} from './dto/payment-params.dto'
import { DataSource, EntityManager } from 'typeorm'

@ApiTags('payments')
@Controller('payments')
@Auth()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  async getPayments(@Query() query: GetPaymentsParamsDto) {
    return this.paymentService.getPayments(query)
  }

  @Post()
  async createTransactions(
    @Body() body: CreatePaymentParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.paymentService.createPayment(body, etm)
  }

  @Post(':paymentId/confirm')
  async confirmPayment(
    @Param() params: ConfirmPaymentParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.paymentService.confirmPayment(params, etm)
  }

  @Post('/confirm-all')
  async confirmUserAllPayments(
    @Body() bodyParams: ConfirmUserAllPaymentParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.paymentService.confirmUserAllPayments(bodyParams, etm)
  }
}
