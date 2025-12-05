import jwt from 'jsonwebtoken';

/**
 * Generates a signed JWT token using the provided payload and secret key.
 *
 * Typically used for authentication and authorization, where the payload contains user information or claims. You can optionally configure
 * expiration time and other token options.
 *
 * @function generateToken
 * @param {Object} payload - The payload to include in the token.
 * @param {string} key - The secret key to sign the token.
 * @param {Object} [options] - Optional settings for the token (e.g., expiration).
 * @return {string} The generated JWT token.
 */
export const generateToken = (payload: object, key: string, options?: jwt.SignOptions): string => {
  return jwt.sign(payload, key, options);
};
