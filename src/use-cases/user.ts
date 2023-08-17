import { User } from "@prisma/client"
import { AppError } from "../errors/AppError"
import { hash } from 'bcrypt'
import { UsersRepository } from "../repositories/user-repository"

interface CreateUserRequest{
    email: string,
    password: string,
    username: string
}

interface CreateUserUseCaseResponse{
    user: User
}

export class CreateUser{
    constructor(private userRepository: UsersRepository){}
    async execute({
        email,
        password,
        username
        }:
        CreateUserRequest   
        ): Promise<CreateUserUseCaseResponse>{
    
        const userWithSameEmail = await this.userRepository.getUserByEmail(email)
    
        if(userWithSameEmail){
            console.log('passei')
           throw new AppError('User already exists.', 409)
        }
    
        const hashPassword = await hash(password, 4)
    
       const user =  await this.userRepository.create({email, username, password: hashPassword})
       return {
        user
       }
    }
}