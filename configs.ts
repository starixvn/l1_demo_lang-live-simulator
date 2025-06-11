const configs = {
  env: process.env.NODE_ENV || "DEV",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  port: process.env.PORT || 3000,
};

export default configs; 