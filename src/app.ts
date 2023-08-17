import  fastify  from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { AppError } from "./errors/AppError";

const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {  
    if (env.NODE_ENV !== 'production') {
      console.error(error)
    } else {
      // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry/Bugsnag
    }

    if (error instanceof ZodError) {
        return reply
          .status(400)
          .send({ message: 'Validation error.', issues: error.format() })
      }else if(error instanceof AppError){
        return reply
          .status(error.statusCode)
          .send({ message: error.message})
      }else{
          return reply.status(500).send({message: 'Internal server error'})
      }
})

export default app