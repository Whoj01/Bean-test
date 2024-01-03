import { InputUser, OutputUser } from "../../../models/User";

export type LoginUser = Pick<InputUser, 'name' | 'password'>

export interface ILoginUserRepository {
  findUser(user: LoginUser): Promise<OutputUser | string>;
}