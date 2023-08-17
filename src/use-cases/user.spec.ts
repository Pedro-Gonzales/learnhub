import { beforeEach, describe, expect, it, test } from 'vitest'
import { PrismaUserRepository } from '../repositories/prisma/prisma-user-repositorie'
import { CreateUser } from './user'
import { compare } from 'bcrypt'
import { InMemoryUserREpository } from '../repositories/in-memory/in-memory-user-repository'
import { AppError } from '../errors/AppError'

// test('tem que funcionar', ()=>{
//     expect(1+1).toBe(2)
// })

let usersRepository: InMemoryUserREpository
let registerUseCase: CreateUser

describe('User use case tests', ()=>{
    beforeEach(() => {
        usersRepository = new InMemoryUserREpository()
        registerUseCase = new CreateUser(usersRepository)
      })
    it('should hash user password upon registration', async ()=>{
        const { user } = await registerUseCase.execute({
            email: 'jhondoe@example.com',
            username:'jhonGameplays',
            password: '1234567'
        })

        const isPasswordHashCorrectly = await compare('1234567', user.password)

        expect(isPasswordHashCorrectly).toBe(true)
    })
    it('should not be able to register with same email twice', async ()=>{
        const email = 'johndoe@example.com'

        await registerUseCase.execute({
        username: 'John Doe',
        email,
        password: '1234567',
        })

        await expect(() =>
        registerUseCase.execute({
            username: 'John Doe',
            email,
            password: '1234567',
        }),
        ).rejects.toBeInstanceOf(AppError)
    })
})