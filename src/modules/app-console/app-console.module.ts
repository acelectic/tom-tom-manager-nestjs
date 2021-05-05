import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.modules'
import { AppConsoleService } from './app-console.service'
import { UserModule } from '../user/user.module'
import { TransactionModule } from '../transaction/transaction.modules'

@Module({
  imports: [AuthModule, UserModule, TransactionModule],
  providers: [AppConsoleService],
})
export class AppConsoleModule {}
