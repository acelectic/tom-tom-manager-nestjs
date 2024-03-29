import { CacheTTL, Injectable } from '@nestjs/common'
import { Transaction } from 'src/db/entities/Transaction'
import { EntityManager } from 'typeorm'
import { User } from '../../db/entities/User'
import { Role } from '../auth/auth.constant'
import { GetUsersParamsDto, UpdateUserDto } from './dto/user-params.dto'
import { ParamsCreateUserSignIn } from './user.interface'
import bcrypt from 'bcrypt'
import { validateError } from 'src/utils/response-error'
import { paginate } from 'nestjs-typeorm-paginate'

@Injectable()
export class UserService {
  constructor() {}

  async getUsers(params: GetUsersParamsDto) {
    const { transactionId, page = 1, limit = 5 } = params

    const queryBuilder = User.createQueryBuilder('user')
    if (transactionId) {
      const transaction = await Transaction.createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.users', 'users')
        .where('transaction.id = :transactionId', { transactionId })
        .getOne()
      const userIds = transaction.users.map(({ id }) => id)
      queryBuilder.where('user.id in (:...userIds)', { userIds })
    }
    // queryBuilder.leftJoinAndSelect('user.payments', 'payments')
    queryBuilder.orderBy('user.name', 'ASC')

    // queryBuilder.take(limit).skip((page - 1) * limit)
    // const [items, total] = await Promise.all([queryBuilder.getMany(), queryBuilder.getCount()])

    const response = await paginate(queryBuilder, {
      page,
      limit,
    })
    return response
  }

  getUser(userId: string) {
    return User.findOne({
      where: {
        id: userId,
      },
      cache: 30 * 1000,
    })
  }

  getCurrentUserBalance(userId: string) {
    return User.findOne({
      where: {
        id: userId,
      },
      select: ['balance'],
    })
  }

  @CacheTTL(20)
  getUserWithId(userId: string) {
    return User.findOneBy({
      id: userId,
    })
  }

  async createUserSignIn(params: ParamsCreateUserSignIn, etm: EntityManager) {
    const { email, role, password, name } = params
    const user = await User.findOrInit({ email, role, password, name })
    return await etm.save(user)
  }

  async changeRole(userId: string, role: Role, etm: EntityManager) {
    const user = await User.findOneBy({
      id: userId,
    })
    if (!user) return
    user.role = role
    return await etm.save(user)
  }

  async updateUser(userId: string, params: UpdateUserDto, etm: EntityManager) {
    const { name, password, role } = params
    const user = await User.findOneBy({
      id: userId,
    })

    if (name) {
      user.name = name
    }
    if (password) {
      const encryptPassword = await bcrypt.hash(password, 10)
      user.password = encryptPassword
    }
    if (role) {
      user.role = role
    }
    return await etm.save(user)
  }

  private async validateUpdateUser(userId: string, params: UpdateUserDto) {
    const { name, password, role } = params
    const user = await User.findOneBy({
      id: userId,
    })

    if (!user) {
      validateError('User not found')
    }

    if (!name || !password) {
      validateError('Invalid information')
    }
  }
}
