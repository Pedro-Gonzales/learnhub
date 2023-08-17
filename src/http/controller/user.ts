import { z } from "zod"
import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUser } from "../../use-cases/user"
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repositorie"
import { AppError } from "../../errors/AppError"

export async function userController (request : FastifyRequest, reply : FastifyReply) {
    
    const userSchema = z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(7)
    })
    
    const { email, username, password } = userSchema.parse(request.body)
    
    const prismaUserRepository = new PrismaUserRepository
    const createUser = new CreateUser(prismaUserRepository)
    try{
        await createUser.execute({email, username, password})
    }catch(err: any){
        throw new AppError(err.message)
    }
   
    return reply.status(201).send()
  }