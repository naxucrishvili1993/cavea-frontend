import axios from "axios";

const API = "http://localhost:5000"; // change if needed

export const getLocations = async () => {
	const res = await axios.get(`${API}/locations`);
	return res.data;
};

export const createLocation = async (address: string) => {
	const res = await axios.post(`${API}/locations`, { address });
	return res.data.location;
};

export const deleteLocation = async (id: number) => {
	const res = await axios.delete(`${API}/locations/${id}`);
	return res.data;
};

export const updateLocation = async (id: number, address: string) => {
	const res = await axios.patch(`${API}/locations/${id}`, { address });
	return res.data.location;
};
