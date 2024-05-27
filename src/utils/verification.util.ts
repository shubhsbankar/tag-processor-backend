import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyData = async (data: any): Promise<{ isValid: boolean, points: number, message: string }> => {
  const { uid, encData, eccSignature } = data;
  let points = 0;

  // Check if UID exists in the database
  const tag = await prisma.tag.findUnique({ where: { uid } });
  if (!tag) {
    return { isValid: false, points: -3, message: 'UID does not exist' };
  }

  // Check encrypted data match
  if (tag.encData !== encData) {
    return { isValid: false, points: -2, message: 'Encrypted data mismatch' };
  }

  // Verify ECC signature (assuming ECC signature verification logic)
  const isValidSignature = verifyEccSignature(eccSignature, tag); // Implement this function
  if (!isValidSignature) {
    return { isValid: false, points: -4, message: 'Invalid ECC signature' };
  }

  // Increment the read count
  await prisma.tag.update({
    where: { uid },
    data: { readCount: { increment: 1 } },
  });

  points += 4;
  return { isValid: true, points, message: 'Data is valid' };
};

// Sample ECC signature verification (replace with actual implementation)
const verifyEccSignature = (signature: string, tag: any): boolean => {
  // Implement ECC signature verification
  return true; // Placeholder return value
};
