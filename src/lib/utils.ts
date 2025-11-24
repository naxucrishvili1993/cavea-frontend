import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateZodErrorString(
	field: string,
	min: number,
	max: number
) {
	return {
		min: `${field} is too short, min ${min} characters!`,
		max: `${field} is too long, max ${max} characters!`,
	};
}
