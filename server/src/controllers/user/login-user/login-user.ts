import { OutputUser } from "../../../models/User";
import { errorRequest, successesRequest } from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResponse, HttpResquest, IController, requiredFieldsError, statusCode } from "../../protocols";
import { ILoginUserRepository, LoginUser } from "./protocols";

export class LoginUserController implements IController {
  constructor (private readonly loginUserRepository: ILoginUserRepository) {}

  #responses: { [key: string]: any } = {
    "Usuário não encontrado": errorRequest('Usuário não encontrado', statusCode.notFound),
    "Senha inválida": errorRequest('Senha inválida', statusCode.unauthorized),
  }

  async handle(httpResquest: HttpResquest<LoginUser>): Promise<HttpResponse<OutputUser | string>> {
    try {
      const { body } = httpResquest

      const requiredFields: requiredFieldsError = verifyRequiredFields(['password', 'name'], body)

      if(requiredFields) return requiredFields

      const user = await this.loginUserRepository.findUser(body!)

      if (typeof user === 'string' && this.#responses[user]) {
        return this.#responses[user];
      }

      if (user) return successesRequest('Usuário logado com sucesso', statusCode.ok, user)

      return errorRequest('Usuário não encontrado', statusCode.notFound)
    } catch (error: any) {
      return errorRequest(error.message, statusCode.internalServerError)
    }
  }
}