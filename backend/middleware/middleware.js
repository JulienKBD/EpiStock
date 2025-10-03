// middlewares.js
const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};

const jsonBigInt = (data) => JSON.stringify(data, (_, value) =>
  typeof value === 'bigint' ? value.toString() : value
);

module.exports = {
  loggingMiddleware,
  corsMiddleware,
  jsonBigInt,
};
