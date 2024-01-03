import { FastifyInstance, FastifyRequest } from "fastify";
import { PrismaCreateUserRepository } from "../repositories/user/create-user/prisma-create-user";
import { CreateUserController } from "../controllers/user/create-user/create-user";
import { InputUser } from "../models/User";
import { PrismaLoginUserRepository } from "../repositories/user/login-user/prisma-login-user";
import { LoginUserController } from "../controllers/user/login-user/login-user";
import { LoginUser } from "../controllers/user/login-user/protocols";

export async function UserRoutes(app: FastifyInstance) {
  app.post("/user", async (request: FastifyRequest<{ Body: InputUser }>, reply) => {
    const createUserRepository = new PrismaCreateUserRepository()

    const createUserController = new CreateUserController(createUserRepository)

    const { body, statusCode } = await createUserController.handle({
      body: request.body
    })

    reply.code(statusCode).send(body)
  })

  app.post("/user/login", async (request: FastifyRequest<{ Body: LoginUser }>, reply) => {
    const loginUserRepository = new PrismaLoginUserRepository()

    const loginUserController = new LoginUserController(loginUserRepository)

    const { body, statusCode } = await loginUserController.handle({
      body: request.body
    })

    reply.code(statusCode).send(body)
  })
}