import { generateZodErrorString } from "@/lib/utils";
import z from "zod";

export const createInventorySchema = z.object({
	name: z
		.string()
		.trim()
		.min(8, generateZodErrorString("Inventory name", 8, 100).min)
		.max(100, generateZodErrorString("Inventory name", 8, 100).max)
		.nonoptional(),
	description: z
		.string()
		.trim()
		.min(10, generateZodErrorString("Inventory description", 10, 255).min)
		.max(255, generateZodErrorString("Inventory description", 10, 255).max)
		.nonoptional(),
	price: z.number().min(1, "Price must be at least ₾1").nonoptional(),
	locationId: z.number().nonoptional(),
});
