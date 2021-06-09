import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/userRouter";

export const prisma = new PrismaClient();

export const createServer = async () => {
  const server = fastify({
    logger: true,
  });

  server.register(require("fastify-cors"));
  server.register(userRouter, { prefix: "/api" });

  await server.ready();
  return server;
};

export const startServer = async () => {
  const server = await createServer();

  await server.listen(4200);

  prisma
    .$connect()
    .then(() => {
      server.log.info("Database connected");
    })
    .catch((err) => {
      server.log.error("Database connection failed!");
      server.log.error(err);
    });
};

startServer();
