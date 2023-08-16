import prisma from "../lib/prisma"
import { hash } from 'bcrypt'

interface CreateUserRequest{
    email: string,
    password: string,
    username: string
}

export class CreateUser{
    constructor(private userRepository: any){}
    async execute({
        email,
        password,
        username
        }:
        CreateUserRequest   
        ){
    
        const user = await this.userRepository.getUserByEmail(email)
    
        if(user){
           throw new Error('User already exists.')
        }
    
        const hashPassword = await hash(password, 4)
    
        await this.userRepository.create({email, username, password: hashPassword})
    }
}