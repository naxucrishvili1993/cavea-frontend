import React, { useState } from "react";

import { createInventory } from "@/api/inventories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFetchLocations } from "@/hooks/useFetchLocations";
import { createInventorySchema } from "@/schemas/create-inventory";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddInventory() {
	const navigate = useNavigate();

	const { locations, loading: locationsLoading } = useFetchLocations();

	const [form, setForm] = useState({
		name: "",
		description: "",
		price: "0",
		locationId: locations.length > 0 ? String(locations[0].id) : "",
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const resetForm = () => {
		setForm({
			name: "",
			description: "",
			price: "0",
			locationId: locations.length > 0 ? String(locations[0].id) : "",
		});
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSelect = (value: string) => {
		setForm({ ...form, locationId: value });
	};

	const handleSubmit = () => {
		const parsedData = {
			...form,
			price: form.price === "" ? undefined : Number(form.price),
			locationId: form.locationId === "" ? undefined : Number(form.locationId),
		};

		const result = createInventorySchema.safeParse(parsedData);

		if (!result.success) {
			const formatted: Record<string, string> = {};

			result.error.issues.forEach((issue) => {
				if (issue.path[0]) formatted[issue.path[0] as string] = issue.message;
			});

			setErrors(formatted);
			return;
		}

		setErrors({});
		console.log("VALID!", result.data);
		createInventory({
			description: result.data.description,
			locationId: result.data.locationId,
			name: result.data.name,
			price: result.data.price,
		})
			.then(() => {
				toast.success("Inventory item created successfully!");
				navigate("/inventories");
				resetForm();
			})
			.catch((e: { response?: { data?: { message?: string } } }) => {
				let errorStr = "Failed to create inventory item";
				if (
					e?.response?.data?.message &&
					e?.response?.data?.message.includes("must be unique")
				) {
					errorStr = "An inventory item with this name already exists.";
				}
				toast.error(errorStr);
			});
	};

	return (
		<>
			<Link to="/inventories" className="underline p-6 flex items-center gap-2">
				<ArrowLeft size={16} /> <span>Back to Inventories</span>
			</Link>
			<div className="mx-auto px-10 mt-20 max-w-[500px] ">
				<div className="max-w-md space-y-6 p-6 border rounded-md ">
					{/* NAME */}
					<div className="space-y-2">
						<Label>Name</Label>
						<Input
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="Inventory name"
						/>
						{errors.name && (
							<p className="text-sm text-red-500">{errors.name}</p>
						)}
					</div>

					{/* DESCRIPTION */}
					<div className="space-y-2">
						<Label>Description</Label>
						<Textarea
							name="description"
							value={form.description}
							onChange={handleChange}
							placeholder="Inventory description"
						/>
						{errors.description && (
							<p className="text-sm text-red-500">{errors.description}</p>
						)}
					</div>

					{/* PRICE */}
					<div className="space-y-2">
						<Label>Price</Label>
						<Input
							type="number"
							name="price"
							value={form.price}
							onChange={handleChange}
							placeholder="0"
						/>
						{errors.price && (
							<p className="text-sm text-red-500">{errors.price}</p>
						)}
					</div>

					{/* LOCATION */}
					<div className="space-y-2">
						<Label>Location</Label>

						<Select onValueChange={handleSelect} value={form.locationId}>
							<SelectTrigger>
								<SelectValue
									placeholder={
										locationsLoading ? "Loading..." : "Select location"
									}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{locations.map((loc) => (
										<SelectItem key={loc.id} value={String(loc.id)}>
											{loc.address}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

						{errors.locationId && (
							<p className="text-sm text-red-500">{errors.locationId}</p>
						)}
					</div>

					{/* SUBMIT */}
					<Button onClick={handleSubmit} className="w-full">
						Submit
					</Button>
				</div>
			</div>
		</>
	);
}
