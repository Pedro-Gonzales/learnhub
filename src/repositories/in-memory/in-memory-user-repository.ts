import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../user-repository'

export class InMemoryUserREpository implements UsersRepository{
    public items: User[] = []

    async getUserByEmail(email: string): Promise<User | null> {
        const user = this.items.find(item => item.email === email)

        if(!user){
            return null
        }
        
        return user
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: 'user-1',
            username: data.username,
            email: data.email,
            password: data.password
        }

        this.items.push(user)

        return user
    }    
}