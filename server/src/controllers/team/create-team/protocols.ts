import { Team } from "../../../models/Team";

export type CreateTeamProps = Pick<Team, "name" | "pokemons_id" | "user_id">

export interface ICreateTeamRepository {
  createTeam(team: CreateTeamProps): Promise<Team>
}