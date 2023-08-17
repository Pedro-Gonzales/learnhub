import { FastifyInstance } from "fastify";
import { userController } from "./controller/user";

export async function appRoutes(app: FastifyInstance){
    app.post('/users', userController)
    app.get('/users', userController)
}