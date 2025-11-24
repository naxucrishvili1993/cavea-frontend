import { InventoryTable } from "@/components/InventoryTable";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useInventories } from "@/hooks/useInventories";

export default function InventoriesPage() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get("page") || "1";
	const locationId = searchParams.get("locationId") || "all";
	const sort = searchParams.get("sort") || "name";
	const order = searchParams.get("order") || "asc";

	const { inventories, setInventories, count, setCount, loading, error } =
		useInventories({
			page,
			locationId,
			sortBy: sort as "name" | "price" | "location",
			order: order as "ASC" | "DESC",
		});

	return (
		<div>
			{loading && (
				<div className="w-full h-dvh overflow-hidden flex justify-center items-center">
					<Loader2 className="animate-spin" size={36} />
				</div>
			)}
			{error && <p className="text-red-500">{error}</p>}
			{!loading && !error && (
				<InventoryTable
					inventories={inventories}
					setInventories={setInventories}
					count={count}
					setCount={setCount}
				/>
			)}
		</div>
	);
}
