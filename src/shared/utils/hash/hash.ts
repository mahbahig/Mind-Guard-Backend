import { getConfigService } from '@config/app.config';
import { hash } from 'bcrypt';

/**
 * Hashes a plain text string using bcrypt.
 *
 * Typically used for securely storing sensitive information like passwords.
 *
 * @async
 * @function compareHash
 * @param {string} plainText - The plain text to compare.
 * @param {number} [saltRounds] - The number of salt rounds to use. Default value is environment variable SALT_ROUNDS.
 * @returns {Promise<string>} A promise that resolves to the hashed string.
 */
export const hashValue = async (plainText: string, saltRounds: number = Number(getConfigService().get<string>('hashing.saltRounds'))): Promise<string> => {
  return await hash(plainText, saltRounds);
};
