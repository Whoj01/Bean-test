import { HttpResquest } from "../controllers/protocols";
import { OutputUser } from "../models/User";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(req: HttpResquest<OutputUser>, res: any, next: any) {
  try {
    if (req.headers?.authorization) {
      const [Bearer, token] = req.headers.authorization.split(" ");
      if (Bearer !== "Bearer" || !token) {
        return res.status(400).send({ msg: "Token mal formatado" });
      }

      const user = verifyToken(token);

      req.user = user;

      next();
    }
  } catch (err: any) {
    return res.status(401).send({ msg: err.message });
  }
}