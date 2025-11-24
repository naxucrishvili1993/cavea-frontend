import axios from "axios";

const API = "http://localhost:5000"; // change if needed

export const getLocations = async () => {
	const res = await axios.get(`${API}/locations`);
	return res.data;
};
