import crypto from 'crypto';

// Sample decryption function using a key derivation function (KDF)
export const decryptData = (encryptedData: string, key: string, iv: string): any => {
  // Convert key and IV from hex to Buffer
  const keyBuffer = Buffer.from(key, 'hex');
  const ivBuffer = Buffer.from(iv, 'hex');

  // Ensure the key is 32 bytes long and the IV is 16 bytes long
  if (keyBuffer.length !== 32) {
    throw new Error('Invalid key length. Must be 32 bytes.');
  }
  if (ivBuffer.length !== 16) {
    throw new Error('Invalid IV length. Must be 16 bytes.');
  }

  // Create decipher instance with specified algorithm, key, and iv
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, ivBuffer);

  // Decrypt the data
  let decrypted = decipher.update(encryptedData, 'base64', 'utf-8');
  decrypted += decipher.final('utf-8');

  console.log("Decrypted:", decrypted);
  return JSON.parse(decrypted);
};
