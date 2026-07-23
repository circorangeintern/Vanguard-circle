const { PrismaClient } = require("@prisma/client");

// A single shared client for the whole process. Every route file previously
// created its own `new PrismaClient()`, which each opens its own connection
// pool — against a serverless Postgres (Neon) with a low connection limit,
// that's 5x the connections needed and a real contributor to the "works,
// then randomly 500s" flakiness reported in production.
const prisma = new PrismaClient();

module.exports = prisma;
