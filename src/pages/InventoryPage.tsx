import { useEffect, useState } from "react";
import type { Inventory } from "../types/inventory";
import { getInventories } from "../api/inventories.api";

export default function InventoriesPage() {
	const [inventories, setInventories] = useState<Inventory[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchInventories() {
			setLoading(true);
			try {
				const data = await getInventories();
				setInventories(data);
			} catch (e) {
				setError("Failed to fetch inventories");
				setInventories([]);
			} finally {
				setLoading(false);
			}
		}

		fetchInventories();
	}, []);
	return (
		<div>
			<h1 className="text-3xl font-bold mb-4">Inventories</h1>
			{loading && <p>Loading inventories...</p>}
			{error && <p className="text-red-500">{error}</p>}
			{!loading && !error && (
				<ul className="space-y-2">
					{inventories.map((inventory) => (
						<li key={inventory.id} className="border p-4 rounded">
							<h2 className="text-xl font-semibold">{inventory.name}</h2>
							<p>{inventory.description}</p>
							<p className="text-gray-600">${inventory.price}</p>
							<p className="text-gray-600">{inventory.location}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
