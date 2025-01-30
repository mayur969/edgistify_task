import z from "zod";

const userInfoSchema = z.object({
    fullName: z.string().regex(/^[A-Za-z]+([-'\s][A-Za-z]+)*$/, {message: "Invalid full name format."}),
    email: z.string().regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {message: "Invalid email format."}),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*?]{8,}$/, {message: "Invalid password format."}),
})

type UserInfo = z.infer<typeof userInfoSchema>;

const loginSchema = userInfoSchema.omit({ fullName: true });

export { userInfoSchema, UserInfo, loginSchema };