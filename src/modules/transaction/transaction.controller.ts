import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common'
import { Auth } from '../auth/auth.decorator'
import { ApiTags } from '@nestjs/swagger'
import { DataSource, EntityManager } from 'typeorm'
import { TransactionService } from './transaction.service'
import {
  CreateTransactionParamsDto,
  GetTransactionHistoryParamsDto,
  GetTransactionParamsDto,
} from './dto/transaction-params.dto'

@ApiTags('transactions')
@Controller('transactions')
@Auth()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly dataSource: DataSource,
  ) {}

  @Get()
  async getTransactions(@Query() params: GetTransactionParamsDto) {
    return this.transactionService.getTransactions(params)
  }

  @Get('history')
  async getTransactionsHistory(@Query() queryParams: GetTransactionHistoryParamsDto) {
    return this.transactionService.getTransactionsHistory(queryParams)
  }

  @Get(':transactionId')
  async getTransaction(@Param('transactionId', new ParseUUIDPipe()) transactionId: string) {
    return this.transactionService.getTransaction(transactionId)
  }

  @Post()
  async createTransactions(
    @Body() body: CreateTransactionParamsDto,
    etm = this.dataSource.createEntityManager(),
  ) {
    return this.transactionService.createTransaction(body, etm)
  }
}
