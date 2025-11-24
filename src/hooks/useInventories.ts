import { getInventories } from "@/api/inventories";
import type { Inventory } from "@/types/inventory";
import { useEffect, useState } from "react";

interface UseInventoriesParams {
	page: string;
	locationId: string;
	sortBy: "name" | "price" | "location";
	order: "ASC" | "DESC";
}

export function useInventories(params: UseInventoriesParams) {
	const [inventories, setInventories] = useState<Inventory[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [count, setCount] = useState<number | null>(null);

	useEffect(() => {
		async function fetchInventories() {
			setLoading(true);
			try {
				const data = await getInventories({
					page: params.page,
					locationId: params.locationId,
					sortBy: (params.sortBy as "name" | "price" | "location") || "name",
					order: params.order
						? (params.order.toUpperCase() as "ASC" | "DESC")
						: "ASC",
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
	}, [params.page, params.locationId, params.sortBy, params.order]);

	return { inventories, setInventories, count, setCount, loading, error };
}
