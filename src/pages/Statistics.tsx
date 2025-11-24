import { getLocationsAndInventoryCounts } from "@/api/inventories";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type LocationData = {
	id: number;
	address: string;
	inventoryCount: string;
	totalPrice: string;
};

export default function Statistics() {
	const [locationsData, setLocationsData] = useState<LocationData[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function fetchLocationsData() {
			setLoading(true);
			try {
				const data = await getLocationsAndInventoryCounts();
				setLocationsData(data);
				setError(null);
			} catch (error) {
				console.error("Failed to fetch locations data", error);
				setError("Failed to fetch locations data");
			} finally {
				setLoading(false);
			}
		}
		fetchLocationsData();
	}, []);

	return (
		<div>
			{!loading && (
				<Link
					to="/inventories"
					className="underline p-6 flex items-center gap-2">
					<ArrowLeft size={16} /> <span>Back to Inventories</span>
				</Link>
			)}
			{loading ? (
				<Loader2 className="animate-spin" size={24} />
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<>
					<div className="p-6">
						<table className="w-full max-w-[500px] mx-auto mt-20 border-collapse px-5 sm:px-10 lg:px-20">
							<thead>
								<tr className="border-b">
									<th className="text-left p-3">Location</th>
									<th className="text-right p-3">Items</th>
									<th className="text-right p-3">Total Price</th>
								</tr>
							</thead>
							<tbody>
								{locationsData.map((location) => (
									<tr key={location.id} className="border-b hover:bg-muted/50">
										<td className="p-3">{location.address}</td>
										<td className="text-right p-3">
											{location.inventoryCount}
										</td>
										<td className="text-right p-3">₾{location.totalPrice}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</>
			)}
		</div>
	);
}
