import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Service to log device actions
export const logDeviceAction = async (userId: number, action: string) => {
  await prisma.deviceLog.create({
    data: {
      userId,
      action,
    },
  });
};
