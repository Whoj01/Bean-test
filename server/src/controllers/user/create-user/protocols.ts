import { InputUser, OutputUser } from "../../../models/User";

export interface ICreateUserRepository {
  createUser(params: InputUser): Promise<OutputUser>;
}