import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Inventories from "./pages/Inventories";
import InventoryEditPage from "./pages/InventoryEditPage";
import AddInventory from "./pages/AddInventory";
import { Toaster } from "./components/ui/sonner";
import Statistics from "./pages/Statistics";
import ManageLocations from "./pages/ManageLocations";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Inventories />} />
					<Route path="/inventories" element={<Inventories />} />
					<Route path="/inventories/:id" element={<InventoryEditPage />} />
					<Route path="/add-inventory" element={<AddInventory />} />
					<Route path="/statistics" element={<Statistics />} />
					<Route path="/manage-locations" element={<ManageLocations />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
			<Toaster />
		</>
	);
}

export default App;
