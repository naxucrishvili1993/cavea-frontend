import { useEffect, useState } from "react";
import type { Inventory } from "../types/inventory";
import { getInventories } from "../api/inventories";
import { InventoryTable } from "@/components/InventoryTable";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function InventoriesPage() {
	const [searchParams] = useSearchParams();
	const [inventories, setInventories] = useState<Inventory[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [count, setCount] = useState<number | null>(null);

	const page = searchParams.get("page") || "1";
	const locationId = searchParams.get("locationId") || "all";
	const sort = searchParams.get("sort") || "name";
	const order = searchParams.get("order") || "asc";

	useEffect(() => {
		async function fetchInventories() {
			setLoading(true);
			try {
				const data = await getInventories({
					page,
					locationId,
					sortBy: (sort as "name" | "price" | "location") || "name",
					order: order ? (order.toUpperCase() as "ASC" | "DESC") : "ASC",
				});
				setInventories(data.inventories);
				setCount(data.total);
				setError(null);
			} catch {
				setError("Failed to fetch inventories");
				setInventories([]);
			} finally {
				setLoading(false);
			}
		}

		fetchInventories();
	}, [page, locationId, sort, order]);
	return (
		<div>
			{loading && (
				<div className="w-full h-dvh overflow-hidden flex justify-center items-center">
					<Loader2 className="animate-spin" size={36} />
				</div>
			)}
			{error && <p className="text-red-500">{error}</p>}
			{!loading && !error && inventories.length > 0 ? (
				<InventoryTable
					inventories={inventories}
					setInventories={setInventories}
					count={count}
					setCount={setCount}
				/>
			) : (
				<>
					<p className="text-center mt-20 text-gray-500">
						No inventories found.
					</p>
					<Link
						to="/add-inventory"
						className="mt-4 block text-center underline">
						Add a new inventory item
					</Link>
				</>
			)}
		</div>
	);
}
