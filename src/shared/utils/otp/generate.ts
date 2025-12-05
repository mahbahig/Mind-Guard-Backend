/**
 * Generates a numeric One-Time Password (OTP) of a specified length.
 *
 * The OTP is a random number typically used for verification purposes, such as confirming email addresses or phone numbers.
 *
 * @function generateOtp
 * @param {number} [length] - Length of the OTP to be generated, default is 6.
 * @returns {string} A numeric OTP of the specified length.
 */
export const generateOtp = (length: number = 6): string => {
  return Math.floor(Math.random() * Math.pow(10, length)).toString();
};
