import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
//   findById(id: string): Promise<User | null>
  getUserByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
//   update(id: string, data: Prisma.UserUpdateInput) : Promise<User>
}