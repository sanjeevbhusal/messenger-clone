import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import axios from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { environmentVariables } from "@/lib/constants";

const signupFormSchema = z.object({
  name: z.string().min(2, "Name cannot be less than 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password cannot be less than 8 characters"),
});

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string(),
});

const credentialTypeSchema = z.object({
  type: z.enum(["signin", "signup"]),
});

async function handleSignup(credentials: any) {
  const parsedDto = signupFormSchema.safeParse(credentials);

  if (!parsedDto.success) {
    throw new Error("Validation Error", { cause: parsedDto.error });
  }

  const { name, email, password } = parsedDto.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Conflict Error", { cause: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}

async function handleSignin(credentials: any) {
  const parsedDto = loginFormSchema.safeParse(credentials);

  if (!parsedDto.success) {
    throw new Error("Validation Error", { cause: parsedDto.error });
  }

  const { email, password } = parsedDto.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.password) {
    throw new Error("User Notfound Error");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Password Invalid Error");
  }

  // create a cookie and also return it in the header.

  return user;
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, request) {
        const query = request.query;
        const parsedQuery = credentialTypeSchema.safeParse(query);

        if (!parsedQuery.success) {
          throw new Error("Validation Error", { cause: parsedQuery.error });
        }

        const authorizationType = parsedQuery.data.type;

        if (authorizationType === "signup") {
          return await handleSignup(credentials);
        } else {
          return await handleSignin(credentials);
        }
      },
      credentials: {},
    }),
  ],
  debug: true,
  secret: environmentVariables.nextAuthSecretKey,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
