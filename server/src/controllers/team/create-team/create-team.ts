import { Team } from "../../../models/Team";
import { errorRequest, successesRequest } from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResponse, HttpResquest, IController, requiredFieldsError, statusCode } from "../../protocols";
import { CreateTeamProps, ICreateTeamRepository } from "./protocols";

export class CreateTeamController implements IController {
  constructor(private readonly createTeamRepository: ICreateTeamRepository) {}
  
  async handle(httpResquest: HttpResquest<Pick<CreateTeamProps, 'name' | 'pokemons_id'>>): Promise<HttpResponse<Team[] | string>> {
    try {
      const teamData = httpResquest.body
      const { user } = httpResquest

      const requiredFields: requiredFieldsError = verifyRequiredFields(['name', 'pokemons_id'], teamData)

      if(requiredFields) return requiredFields

      if(user?.token) return errorRequest('Usuário não autenticado', statusCode.unauthorized)

      const team = await this.createTeamRepository.createTeam({
        name: teamData?.name!,
        pokemons_id: teamData?.pokemons_id!,
        user_id: user?.id,
      })

      if(team) return successesRequest('Time criado com sucesso', statusCode.created, team)

      return errorRequest('Não foi possível criar o time', statusCode.tryAgainLater)
    } catch (error: any) {
      console.log(error)
      return errorRequest(error.message, statusCode.internalServerError)
    }
  }
}