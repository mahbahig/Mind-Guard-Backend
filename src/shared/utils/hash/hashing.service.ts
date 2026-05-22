import { Env } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashingService {
  private readonly saltRounds: number;

  constructor(private readonly configService: ConfigService) {
    this.saltRounds = this.configService.getOrThrow<number>(Env.HASHING_SALT_ROUNDS);
  }

  /**
   * Hashes a plain text string using bcrypt.
   *
   * Typically used for securely storing sensitive information like passwords.
   *
   * @async
   * @function compareHash
   * @param {string} value - The plain text to hash.
   * @returns {Promise<string>} A promise that resolves to the hashed string.
   */
  async hash(value: string): Promise<string> {
    return hash(value, this.saltRounds);
  }

  /**
   * Securely compares a plain text string with a bcrypt-hashed value.
   *
   * Typically used for comparing plain texts with stored hashed values, such as passwords or OTPs.
   *
   * @async
   * @function compareHash
   * @param {string} plainText - The plain text to compare.
   * @param {string} cipherText - The hashed value to compare against.
   * @returns {Promise<boolean>} A promise that resolves to true if the plain text matches the hash, otherwise false.
   */
  async compare(plainText: string, cipherText: string): Promise<boolean> {
    return compare(plainText, cipherText);
  }
}
