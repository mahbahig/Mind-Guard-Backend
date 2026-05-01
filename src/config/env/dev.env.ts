export default () => ({
  port: parseInt(process.env.PORT!, 10),
  db: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    url: process.env.DATABASE_URL,
  },
  sendEmail: {
    email: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD,
    service: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT!, 10),
  },
  hashing: {
    saltRounds: parseInt(process.env.HASHING_SALT_ROUNDS!, 10),
  },
  otp: {
    expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES!, 10),
  },
  jwt: {
    user: {
      secret: process.env.USER_ACCESS_JWT_SECRET,
    },
  },
  encryption: {
    secret: process.env.ENCRYPTION_SECRET,
  },
});
