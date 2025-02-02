import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => console.error('Redis error:', err));

const cacheMiddleware = (req, res, next) => {
  const lang = req.query.lang || 'en';
  client.get(`faqs_${lang}`, (err, data) => {
    if (err) throw err;
    if (data) return res.status(200).json(JSON.parse(data));
    next();
  });
};

export { client, cacheMiddleware };