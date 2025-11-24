import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Inventory } from "../types/inventory";
import { Button } from "./ui/button";
import { InventoryPagination } from "./InventoryPagination";
import { Link } from "react-router-dom";
import LocationsFilterSelect from "./LocationsFilterSelect";
import { toast } from "sonner";
import { deleteInventory as deleteInventoryApi } from "../api/inventories";
import SortingFilters from "./SortingFilters";

export function InventoryTable({
	inventories,
	setInventories,
	count,
	setCount,
}: {
	inventories: Inventory[];
	setInventories: React.Dispatch<React.SetStateAction<Inventory[]>>;
	count: number | null;
	setCount: React.Dispatch<React.SetStateAction<number | null>>;
}) {
	async function deleteInventory(id: number) {
		await deleteInventoryApi(id)
			.then(() => {
				setInventories((prev) => prev.filter((inv) => inv.id !== id));
				if (count !== null) {
					setCount(count - 1);
				}
				toast.success("Inventory deleted successfully");
			})
			.catch(() => {
				toast.error("Failed to delete inventory");
			});
	}
	return (
		<div>
			<div className="py-15 px-3 md:px-15 lg:px-30 lg:max-w-[1200px] lg:mx-auto">
				<div className="flex justify-between">
					<Link to="/add-inventory">
						<Button className="mb-5">Add Inventory</Button>
					</Link>
					<Link to="/statistics">
						<Button className="mb-5">Statistics</Button>
					</Link>
				</div>
				<div className="flex items-center justify-between">
					<h1 className="text-3xl mb-5 font-bold">Inventories</h1>
					<div className="flex gap-5">
						<LocationsFilterSelect />
						<SortingFilters />
					</div>
				</div>
				<Table className="">
					<TableCaption className="mb-5">
						Total number of products: {count}
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Inventory</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Description</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Location</TableHead>
							<TableHead className="text-right">Operations</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{inventories.map((inventory) => (
							<TableRow key={inventory.id}>
								<TableCell className="font-medium">{inventory.id}</TableCell>
								<TableCell>{inventory.name}</TableCell>
								<TableCell>{inventory.description}</TableCell>
								<TableCell>₾{inventory.price}</TableCell>
								<TableCell>{inventory.location}</TableCell>
								<TableCell className="text-right">
									<Button
										variant={"destructive"}
										className="cursor-pointer"
										onClick={() => deleteInventory(inventory.id)}>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<InventoryPagination total={count || 0} />
			</div>
		</div>
	);
}
