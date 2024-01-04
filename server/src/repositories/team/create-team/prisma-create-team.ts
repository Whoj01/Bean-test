import { number } from "zod";
import { CreateTeamProps, ICreateTeamRepository } from "../../../controllers/team/create-team/protocols";
import { prisma } from "../../../libs/prisma-client";
import { Team } from "../../../models/Team";

export class PrismaCreateTeamRepository implements ICreateTeamRepository {
  async createTeam(team: CreateTeamProps): Promise<Team> {
    const createdTeam = await prisma.teams.create({
      data: {
        name: team.name,
        pokemons_id: team.pokemons_id.map((pokemon_id) => '' + pokemon_id),
        user_id: team.user_id,
      }
    })

    return createdTeam
  }
}