import { Body, Controller, Get, Post } from '@nestjs/common'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import { PaymentService } from './payment.service'
import { CreatePaymentParamsDto } from './dto/payment-params.dto'
import { TransactionManager, EntityManager, Transaction } from 'typeorm'

@ApiTags('payments')
@Controller('v1/payments')
@Auth()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getPayments() {
    return this.paymentService.getPayments()
  }

  @Post()
  @Transaction()
  async createTransactions(
    @Body() body: CreatePaymentParamsDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return this.paymentService.createPayment(body, etm)
  }
}
