import { PrismaClient } from "@prisma/client";
import { environmentVariables } from "./constants";

declare global {
  var db: PrismaClient | null;
}

const db = global.db || new PrismaClient();

if (environmentVariables.nodeEnvironment === "development") {
  global.db = db;
}

const prisma = db;

export default prisma;
