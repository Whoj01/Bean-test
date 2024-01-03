import { ICreateUserRepository } from "../../../controllers/user/create-user/protocols";
import { InputUser, OutputUser } from "../../../models/User";
import { prisma } from "../../../libs/prisma-client";
import bcript from 'bcrypt'
import { signToken } from "../../../utils/jwt";
import 'dotenv/config'


export class PrismaCreateUserRepository implements ICreateUserRepository {
  async createUser(user: InputUser): Promise<OutputUser>{
    const saltedAndPepperPass = user.password + process.env.PEPPER + process.env.SALT
    const hashPassword = await bcript.hash(saltedAndPepperPass, 10)

    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
      }
    })

    const token = signToken(createdUser, '30d')
    
    if(!token) {
      throw new Error('Erro gerando token')
    }

    return {
      ...createdUser,
      token
    }
  }
}