import { env } from '../env';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});

export { prisma };
