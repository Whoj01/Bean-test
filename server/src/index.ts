import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { logger } from "./libs/logger";
import { AddressInfo } from "net";
import "dotenv/config";


const server: FastifyInstance = Fastify({});

const PORT = process.env.PORT || 3000;

server.register(cors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
});

server.get("/", async (request, reply) => {
	return reply.send({ message: "Hello fdfd" });
})


const start = async () => {
	try {
		await server.listen({ port: PORT as number, host: '0.0.0.0' });

		const address = server.server.address() as AddressInfo;

		logger.info(`Server listening at ${address.address}:${PORT}`);
	} catch (err: any) {
		logger.error("Error starting server", err.message);
		server.log.error(err);
		process.exit(1);
	}
};

start();