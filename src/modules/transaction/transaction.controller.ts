import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import { EntityManager, Transaction, TransactionManager } from 'typeorm'
import { TransactionService } from './transaction.service'
import {
  CreateTransactionParamsDto,
  GetTransactionHistoryParamsDto,
  GetTransactionParamsDto,
} from './dto/transaction-params.dto'

@ApiTags('transactions')
@Controller('v1/transactions')
@Auth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getTransactions(@Query() params: GetTransactionParamsDto) {
    return this.transactionService.getTransactions(params)
  }

  @Get('history')
  async getTransactionsHistory(@Query() queryParams: GetTransactionHistoryParamsDto) {
    return this.transactionService.getTransactionsHistory(queryParams)
  }

  @Post()
  @Transaction()
  async createTransactions(
    @Body() body: CreateTransactionParamsDto,
    @TransactionManager() etm: EntityManager,
  ) {
    return this.transactionService.createTransaction(body, etm)
  }
}
