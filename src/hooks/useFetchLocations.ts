import { getLocations } from "@/api/locations";
import type { Location } from "@/types/location";
import { useEffect, useState } from "react";

export function useFetchLocations() {
	const [locations, setLocations] = useState<Location[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchLocations() {
			setLoading(true);
			try {
				const data = await getLocations();
				setLocations(data.locations);
			} catch {
				setLocations([]);
			} finally {
				setLoading(false);
			}
		}
		fetchLocations();
	}, []);

	return { locations, loading, setLocations };
}
