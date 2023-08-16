import prisma from "../lib/prisma";
import { Prisma } from '@prisma/client'

export class PrismaUserRepository{
    private users: any[] = []
    async create(data : Prisma.UserCreateInput){
        this.users.push(data)
    }
}