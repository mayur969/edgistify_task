import z from "zod";

const cartItemaddSchema = z.object({
    productId: z.string(),
    quantity: z.number()
});

const updateProductSchema = cartItemaddSchema.omit({quantity: true}).extend({
    action: z.enum(["increase", "decrease"])
})
export {cartItemaddSchema, updateProductSchema};