import axios from "axios";
import type { Inventory } from "../types/inventory";

const API = "http://localhost:5000"; // change if needed

export const getInventories = async (): Promise<Inventory[]> => {
	const res = await axios.get(`${API}/inventories`);
	return res.data.inventories;
};

export const getInventory = async (id: number) => {
	const res = await axios.get(`${API}/inventories/${id}`);
	return res.data.inventory;
};

export const createInventory = async (data: Partial<Inventory>) => {
	const res = await axios.post(`${API}/inventories`, data);
	return res.data.inventory;
};

export const updateInventory = async (id: number, data: Partial<Inventory>) => {
	const res = await axios.put(`${API}/inventories/${id}`, data);
	return res.data.inventory;
};

export const deleteInventory = async (id: number) => {
	return axios.delete(`${API}/inventories/${id}`);
};
