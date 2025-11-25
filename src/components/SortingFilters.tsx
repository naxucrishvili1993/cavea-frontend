import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useQueryParams } from "@/hooks/useQueryParams";

export default function SortingFilters() {
	const { getParam, updateParams } = useQueryParams();

	const currentSort = getParam("sort", "name");
	const currentOrder = getParam("order", "asc");

	function handleValueChange(value: string): void {
		if (!value) return;
		if (`${currentSort}-${currentOrder}` === value) return;

		const [sort, order] = value.split("-");
		updateParams({ sort, order });
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
