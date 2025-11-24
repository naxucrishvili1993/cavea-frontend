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

export default function SortingFilters() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const pathname = window.location.pathname;

	const currentSort = searchParams.get("sort") || "name";
	const currentOrder = searchParams.get("order") || "asc";

	function handleValueChange(value: string): void {
		if (!value) return;
		if (`${currentSort}-${currentOrder}` === value) return;

		const [sort, order] = value.split("-");
		searchParams.set("sort", sort);
		searchParams.set("order", order);
		navigate(`${pathname}?${searchParams.toString()}`);
	}

	return (
		<div>
			<Select
				defaultValue={`${currentSort}-${currentOrder}`}
				onValueChange={handleValueChange}>
				<SelectTrigger className="w-[150px]">
					<SelectValue placeholder="Select sort" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Locations</SelectLabel>
						<SelectItem value="name-asc">Name (ASC)</SelectItem>
						<SelectItem value="name-desc">Name (DESC)</SelectItem>
						<SelectItem value="price-asc">Price (ASC)</SelectItem>
						<SelectItem value="price-desc">Price (DESC)</SelectItem>
						<SelectItem value="location-asc">Location (ASC)</SelectItem>
						<SelectItem value="location-desc">Location (DESC)</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
