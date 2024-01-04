import { Team } from "../../../models/Team";
import { errorRequest, successesRequest } from "../../../utils/responses";
import { HttpResponse, HttpResquest, IController, statusCode } from "../../protocols";
import { GetTeamsRepository } from "./protocols";

export class GetTeamsController implements IController {
  constructor(
    private readonly getTeamsRepository: GetTeamsRepository
  ) { }

  async handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<Team[]>> {
    try {
      const user_id = httpResquest.user?.id
  
      const teams = await this.getTeamsRepository.getTeams(user_id)
  
      return successesRequest('Times encontrados com sucesso',  statusCode.ok, teams)
    } catch (error: any) {
      return errorRequest(error.message, statusCode.internalServerError)
    }
  }
} 
