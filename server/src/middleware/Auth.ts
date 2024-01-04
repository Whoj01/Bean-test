import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    if (request.headers?.authorization) {
      const [Bearer, token] = request.headers.authorization.split(" ");
      if (Bearer !== "Bearer" || !token) {
        reply.status(400).send({ msg: "Token mal formatado" });
        return;
      }

      const user = verifyToken(token);

      if (typeof user !== 'string') {
        (request as any).user = user.payload;
      }
    }
  } catch (err: any) {
    reply.status(401).send({ msg: err.message });
    return;
  }
}