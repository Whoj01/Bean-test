import { FastifyInstance, FastifyRequest } from "fastify";
import { PrismaGetTeamsRepository } from "../repositories/team/get-teams/prisma-get-teams";
import { GetTeamsController } from "../controllers/team/get-teams/get-teams";
import { OutputUser } from "../models/User";
import { authMiddleware } from "../middleware/Auth";
import { PrismaCreateTeamRepository } from "../repositories/team/create-team/prisma-create-team";
import { CreateTeamController } from "../controllers/team/create-team/create-team";
import { CreateTeamProps } from "../controllers/team/create-team/protocols";

export async function TeamRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request, reply) => {
    await authMiddleware(request, reply)
  })

  app.get("/team", async (request, reply) => {
    const prismaGetTeamsRepository = new PrismaGetTeamsRepository()

    const getTeamsController = new GetTeamsController(prismaGetTeamsRepository)

    const { body, statusCode } = await getTeamsController.handle({
      user: (request as any).user,
    })

    reply.code(statusCode).send(body)
  })

  app.post("/team", async (request: FastifyRequest<{ Body: Pick<CreateTeamProps, 'name' | 'pokemons_id'> }>, reply) => {
    const prismaCreateTeamRepository = new PrismaCreateTeamRepository()

    const createTeamsController = new CreateTeamController(prismaCreateTeamRepository)

    const { body, statusCode } = await createTeamsController.handle({
      body: request.body!,
      user: (request as any).user,
    })

    reply.code(statusCode).send(body)
  })
}