import { InputUser, OutputUser } from "../../../models/User";
import { errorRequest, successesRequest } from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResponse, HttpResquest, IController, requiredFieldsError, statusCode } from "../../protocols";
import { ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(httpResquest: HttpResquest<InputUser>): Promise<HttpResponse<OutputUser | string>> {
    try {
      const { body } = httpResquest

      const requiredFields: requiredFieldsError = verifyRequiredFields(['name', 'password'], body)

      if(requiredFields) return requiredFields

      const user = await this.createUserRepository.createUser(body!)

      if(user) {
        return successesRequest('Usuário criado com sucesso', statusCode.created, user)
      }

      return errorRequest('Não foi possível criar o usuário.', statusCode.tryAgainLater)
    } catch (error: any) {
      if (error.meta?.target[0] === "name") {
        return errorRequest("Nome já cadastrado", statusCode.notAcceptable);
      }

      return errorRequest(error.message, statusCode.internalServerError);
    }
  }

}