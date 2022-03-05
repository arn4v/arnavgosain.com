import { PrismaClient } from "@prisma/client";
import { isProd } from "~/constants";

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

if (isProd) {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
    global.prisma.$connect();
  }

  prisma = global.prisma;
}

export { prisma };
