import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
    PORT: z.string().transform((val) => parseInt(val, 10)),
    DATABASE_URL: z.string(),
    SEESION_TOKEN_AGE: z.string().transform((val) => parseInt(val, 10)),
    JWT_SECRET_KEY: z.string(),
});

const env = envSchema.parse(process.env);
export default env;