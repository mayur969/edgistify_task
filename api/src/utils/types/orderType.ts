import z from "zod";

const shippingAddressSchema = z.string().regex(/^[a-zA-Z0-9\s,'-]{5,100}$/, {message: "Invalid shipping address format."});

export {shippingAddressSchema}