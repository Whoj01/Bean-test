import { GetTeamsRepository } from "../../../controllers/team/get-teams/protocols"
import { prisma } from "../../../libs/prisma-client"
import { Team } from "../../../models/Team"

export class PrismaGetTeamsRepository implements GetTeamsRepository {
  async getTeams(user_id: string): Promise<Team[]> {
    const teams = await prisma.teams.findMany({
      where: {
        user_id,
      }
    })

    return teams
  }
}