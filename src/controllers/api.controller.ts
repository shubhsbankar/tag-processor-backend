import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { decryptData } from '../utils/decryption.util';
import { verifyData } from '../utils/verification.util';
import { formatResponse } from '../utils/response.util';
import { logDeviceAction } from '../services/deviceLog.service';

const prisma = new PrismaClient();

export const processRequest = async (req: Request, res: Response) => {
    console.log("Got processRequest requiest")
  try {
    const { encryptedData } = req.body;
    const userId = 1
    const key = "0000000000000000000000000000000000000000000000000000000000000000"
    // Decrypt data
    const decryptedData = decryptData(encryptedData, key, "00000000000000000000000000000000");

    // Verify data
    const verificationResult = await verifyData(decryptedData);
    if (!verificationResult.isValid) {
      await logDeviceAction(userId, 'AUTHENTICATION_FAIL');
      return res.status(400).json(verificationResult);
    }

    // Log device action
    await logDeviceAction(userId, 'PROCESS_REQUEST');

    // Format and send response
    const responseObject = formatResponse(verificationResult);
    res.json(responseObject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
