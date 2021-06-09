import { FastifyReply } from "fastify";
import { prisma } from "..";
import { IUserRequest } from "../interfaces";
import { hashSync } from "bcryptjs";

async function signUp(request: IUserRequest, reply: FastifyReply) {
  try {
    const { email, password, name } = request.body;

    const user = await prisma.user.findUnique({ where: { email: email } });

    if (user) {
      reply.code(500).send(new Error("User Exists"));
    }

    const hashPass = hashSync(password, 10);

    const createUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashPass,
      },
    });

    const token = request.server.jwt.sign({
      id: createUser.id,
      email: createUser.email,
    });

    reply.code(200).send({
      token,
      msg: "User Created Successfully",
    });
  } catch (err) {
    reply.code(500).send(new Error(err));
  }
}

export { signUp };
