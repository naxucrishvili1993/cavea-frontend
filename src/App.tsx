import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import InventoriesPage from "./pages/InventoryPage";
import InventoryEditPage from "./pages/InventoryEditPage";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/inventories" element={<InventoriesPage />} />
					<Route path="/inventories/:id" element={<InventoryEditPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
