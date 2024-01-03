import {
  ILoginUserRepository, LoginUser,
} from "../../../controllers/user/login-user/protocols";
import { prisma } from "../../../libs/prisma-client";
import bcrypt from "bcrypt";
import { OutputUser } from "../../../models/User";
import { signToken } from "../../../utils/jwt";

type UserOptionalPass = {
  id: string;
  name: string;
  password?: string;
}


export class PrismaLoginUserRepository implements ILoginUserRepository {
  async findUser(user: LoginUser): Promise<OutputUser | string> {
    const findUser: UserOptionalPass | null = await prisma.user.findFirst({
      where: {
        name: user?.name
      },
      select: {
        id: true,
        name: true,
        password: true,
      }
    });

    if (!findUser) {
      return "Usuário não encontrado";
    }

    const comparedPash = user.password + process.env.PEPPER + process.env.SALT;
    const isValidPassword = await bcrypt.compare(comparedPash, findUser.password!);

    if (!isValidPassword) {
      return "Senha inválida"
    }

    delete findUser.password;

    const token = signToken(findUser, '30d')    

    return {
      ...findUser,
      token
    };
  }
}