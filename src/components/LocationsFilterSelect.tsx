import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useFetchLocations } from "@/hooks/useFetchLocations";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function LocationsFilterSelect() {
	const { locations, loading } = useFetchLocations();
	const { getParam, updateParam } = useQueryParams();
	const currentLocationId = getParam("locationId", "all");

	function handleValueChange(value: string): void {
		if (value !== currentLocationId) {
			updateParam("locationId", value);
		}
	}

	return (
		<div>
			{
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
							{!loading &&
								locations.length > 0 &&
								locations.map((location) => (
									<SelectItem value={location.id + ""}>
										{location.address}
									</SelectItem>
								))}
						</SelectGroup>
					</SelectContent>
				</Select>
			}
		</div>
	);
}
