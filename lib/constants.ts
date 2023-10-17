import dotenv from "dotenv";
dotenv.config();

const environmentVariables = {
  nextAuthSecretKey: process.env.NEXTAUTH_SECRET_KEY || "",
};

export { environmentVariables };
