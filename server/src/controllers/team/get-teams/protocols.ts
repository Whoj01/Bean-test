import { Team } from "../../../models/Team";

export interface GetTeamsRepository {
  getTeams(user_id: string): Promise<Team[]>
}