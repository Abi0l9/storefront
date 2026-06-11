function getAllowedOrigins() {
  return String(process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    const allowedOrigins = getAllowedOrigins();

    if (!origin || !allowedOrigins.length || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
};

module.exports = { corsOptions };
