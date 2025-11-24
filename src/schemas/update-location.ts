import { generateZodErrorString } from "@/lib/utils";
import z from "zod";

export const updateLocationSchema = z.object({
	address: z
		.string()
		.trim()
		.min(5, generateZodErrorString("Location address", 5, 50).min)
		.max(50, generateZodErrorString("Location address", 5, 50).max)
		.optional(),
});
