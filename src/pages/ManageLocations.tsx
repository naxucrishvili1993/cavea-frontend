import { createLocation, deleteLocation } from "@/api/locations";
import LocationItem from "@/components/LocationItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useFetchLocations } from "@/hooks/useFetchLocations";
import { ArrowLeft, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ManageLocations() {
	const [locationName, setLocationName] = useState("");
	const { locations, loading, setLocations } = useFetchLocations();
	function handleAddLocation(): void {
		if (locationName.trim() === "") {
			toast.error("Location address cannot be empty.");
			return;
		}

		if (locationName.length < 5 || locationName.length > 50) {
			toast.error("Location address must be between 5 and 50 characters.");
			return;
		}

		if (locations.some((loc) => loc.address === locationName.trim())) {
			toast.error("Location address must be unique.");
			return;
		}

		createLocation(locationName.trim())
			.then((loc) => {
				toast.success("Location added successfully.");
				setLocationName("");
				setLocations([...locations, loc]);
			})
			.catch((e) => {
				let errorStr = "Failed to create location";
				if (e?.response?.data?.message.includes("must be unique")) {
					errorStr = "Location with this name already exists.";
				}
				toast.error(errorStr);
			});
	}

	function handleDelete(id: number): void {
		deleteLocation(id)
			.then(() => {
				toast.success("Location deleted successfully.");
				setLocations(locations.filter((loc) => loc.id !== id));
			})
			.catch(() => {
				toast.error("Failed to delete location.");
			});
	}

	return (
		<>
			<Link to="/inventories" className="underline p-6 flex items-center gap-2">
				<ArrowLeft size={16} /> <span>Back to Inventories</span>
			</Link>
			{loading ? (
				<div className="w-full h-dvh overflow-hidden flex justify-center items-center">
					<Loader2 className="animate-spin" size={36} />
				</div>
			) : (
				<div className="p-6 max-w-4xl mx-auto">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-3xl font-bold">Manage Locations</h1>
					</div>

					<div className="border rounded-lg p-4 mb-6 space-y-4">
						<h2 className="text-lg font-semibold">Add New Location</h2>
						<div className="flex gap-3">
							<div className="flex-1">
								<Label className="mb-3">Address</Label>
								<Input
									placeholder="Enter location address"
									value={locationName}
									onChange={(e) => setLocationName(e.target.value)}
								/>
							</div>
							<Button className="self-end" onClick={handleAddLocation}>
								<Plus size={16} className="mr-2" /> Add Location
							</Button>
						</div>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">ID</TableHead>
								<TableHead>Address</TableHead>
								<TableHead className="text-right pe-7">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{locations
								.sort((a, b) => a.id - b.id)
								.map((location) => (
									<LocationItem
										handleDelete={handleDelete}
										location={location}
										key={location.id}
									/>
								))}
						</TableBody>
					</Table>
				</div>
			)}
		</>
	);
}
