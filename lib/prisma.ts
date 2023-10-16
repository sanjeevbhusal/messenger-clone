import { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | null;
}

const db = global.db || new PrismaClient();

const prisma = db;

export default prisma;
