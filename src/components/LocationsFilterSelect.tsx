import { getLocations } from "@/api/locations";
import type { Location } from "@/types/location";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function LocationsFilterSelect() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [locations, setLocations] = useState<Location[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const currentLocationId = searchParams.get("locationId") || "all";

	useEffect(() => {
		async function fetchLocations() {
			setLoading(true);
			try {
				const data = await getLocations();
				setLocations(data.locations);
			} catch (e) {
				console.error("Failed to fetch locations");
				setLocations([]);
			} finally {
				setLoading(false);
			}
		}
		fetchLocations();
	}, []);

	function handleValueChange(value: string): void {
		if (value != currentLocationId) {
			const pathname = window.location.pathname;
			navigate(
				`${pathname}?locationId=${value}&${searchParams
					.toString()
					.replace(`locationId=${currentLocationId}`, "")}`
			);
		}
	}

	return (
		<div>
			{loading ? (
				<Loader2 className="animate-spin" size={16} />
			) : locations.length === 0 ? (
				<p>No locations available</p>
			) : (
				<Select
					defaultValue={currentLocationId}
					onValueChange={handleValueChange}>
					<SelectTrigger className="w-[150px]">
						<SelectValue placeholder="Select a location" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Locations</SelectLabel>
							<SelectItem value="all">All</SelectItem>
							{locations.map((location) => (
								<SelectItem value={location.id + ""}>
									{location.address}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			)}
		</div>
	);
}
