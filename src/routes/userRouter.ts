import { FastifyInstance } from "fastify";
import * as userController from "../controllers/userController";

async function userRouter(fastify: FastifyInstance) {
  // fastify.decorateRequest('authUser', '')

  // add fastify instance
  fastify.decorateRequest("fastify", fastify);

  fastify.register(require("fastify-jwt"), {
    secret: "blogsecret",
  });

  //@ts-ignore
  fastify.post("/user/signup", userController.signUp);
}

export default userRouter;
