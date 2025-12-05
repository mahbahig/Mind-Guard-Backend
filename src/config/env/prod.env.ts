export default () => ({
  port: parseInt(process.env.PORT!, 10),
  db: {
    url: process.env.DATABASE_URL,
  },
});
