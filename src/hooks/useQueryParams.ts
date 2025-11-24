import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export function useQueryParams() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const location = useLocation();

	const updateParam = (key: string, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set(key, value);
		if (key !== "page") {
			newParams.set("page", "1");
		}
		navigate(`${location.pathname}?${newParams.toString()}`);
	};

	const updateParams = (updates: Record<string, string>) => {
		const newParams = new URLSearchParams(searchParams.toString());
		Object.entries(updates).forEach(([key, value]) => {
			newParams.set(key, value);
		});
		if (!updates.page) {
			newParams.set("page", "1");
		}
		navigate(`${location.pathname}?${newParams.toString()}`);
	};

	const getParam = (key: string, defaultValue: string) => {
		return searchParams.get(key) || defaultValue;
	};

	return {
		getParam,
		updateParam,
		updateParams,
		searchParams,
		pathname: location.pathname,
	};
}
