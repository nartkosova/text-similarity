import dotenv from 'dotenv';

dotenv.config();

interface EnvironmentConfig {
  PORT: number;
  MONGO_URI: string;
  FASTAPI_URL: string;
  NODE_ENV: string;
}

function validateEnvironment(): EnvironmentConfig {
  const requiredVars = ['MONGO_URI', 'FASTAPI_URL'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  const port = parseInt(process.env.PORT || '3000', 10);
  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid port number between 1 and 65535');
  }

  return {
    PORT: port,
    MONGO_URI: process.env.MONGO_URI!,
    FASTAPI_URL: process.env.FASTAPI_URL!,
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
}

export const config = validateEnvironment(); 