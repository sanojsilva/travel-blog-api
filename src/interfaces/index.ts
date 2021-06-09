import { FastifyInstance, FastifyRequest } from "fastify";
import { FastifyJWT } from "fastify-jwt";
import { Prisma } from "prisma/prisma-client";

export type ServerInstance = FastifyInstance & FastifyJWT;

export interface IUserRequest extends FastifyRequest {
  body: Prisma.UserCreateInput;
  server: ServerInstance;
}
