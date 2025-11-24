import { updateLocation } from "@/api/locations";
import { CheckIcon, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TableCell, TableRow } from "./ui/table";

export default function LocationItem({
	location,
	handleDelete,
}: {
	location: { id: number; address: string };
	handleDelete: (id: number) => void;
}) {
	const [editedAddress, setEditedAddress] = useState(location.address);
	const [isEditing, setIsEditing] = useState(false);

	function submitEdit(): void {
		if (editedAddress.trim() === "") {
			toast.error("Location address cannot be empty.");
			return;
		}

		if (editedAddress.length < 5 || editedAddress.length > 50) {
			toast.error("Location address must be between 5 and 50 characters.");
			return;
		}

		if (editedAddress.trim() === location.address.trim()) {
			setIsEditing(false);
			return;
		}

		updateLocation(location.id, editedAddress.trim())
			.then(() => {
				toast.success("Location updated successfully.");
			})
			.catch((e) => {
				let errorStr = "Failed to update location";
				if (e?.response?.data?.message.includes("must be unique")) {
					errorStr = "Location with this name already exists.";
				}
				toast.error(errorStr);
			})
			.finally(() => {
				setIsEditing(false);
			});
	}

	return (
		<TableRow key={location.id}>
			<TableCell>{location.id}</TableCell>
			<TableCell>
				{isEditing ? (
					<>
						<div className="flex items-center gap-2">
							<Input
								className="max-w-[300px]"
								value={editedAddress}
								onChange={(e) => setEditedAddress(e.target.value)}
							/>
							<CheckIcon
								size={24}
								color="green"
								className="cursor-pointer"
								onClick={submitEdit}
							/>
						</div>
					</>
				) : (
					editedAddress
				)}
			</TableCell>
			<TableCell className="text-right gap-3 flex justify-end">
				<Button
					variant="destructive"
					size="sm"
					onClick={() => handleDelete(location.id)}>
					<Trash2 size={16} />
				</Button>
				<Button size={"sm"} onClick={() => setIsEditing(!isEditing)}>
					<Edit2 size={16} />
				</Button>
			</TableCell>
		</TableRow>
	);
}
