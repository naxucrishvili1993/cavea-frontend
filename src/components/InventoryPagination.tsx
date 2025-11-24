import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

export function InventoryPagination({ total }: { total?: number }) {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const pathname = window.location.pathname;
	const currentPage = searchParams.get("page") || "1";
	const hasNextPage = total ? +currentPage * 20 < total : false;
	const isFirstPage = +currentPage === 1;

	// მომიწია ამ ფუნქციის შექმნა, რათა თავიდან ამერიდებინა Hard navigation-ის გამოყენება JSX-ში href ატრიბუტის მეშვეობით.
	function navigateToPage(url: string) {
		navigate(url);
	}

	return (
		<div className="flex">
			<Pagination>
				<PaginationContent>
					{!isFirstPage && (
						<>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={() =>
										navigateToPage(
											`${pathname}?page=${+currentPage - 1}&${searchParams
												.toString()
												.replace(`page=${currentPage}`, "")}`
										)
									}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink
									href="#"
									onClick={() =>
										navigateToPage(
											`${pathname}?page=1&${searchParams
												.toString()
												.replace(`page=${currentPage}`, "")}`
										)
									}>
									1
								</PaginationLink>
							</PaginationItem>
						</>
					)}
					<PaginationItem>
						<PaginationLink href="#" isActive>
							{currentPage}
						</PaginationLink>
					</PaginationItem>
					{hasNextPage && (
						<>
							<PaginationItem>
								<PaginationLink
									href="#"
									onClick={() =>
										navigateToPage(
											`${pathname}?page=${+currentPage + 1}&${searchParams
												.toString()
												.replace(`page=${currentPage}`, "")}`
										)
									}>
									{+currentPage + 1}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={() =>
										navigateToPage(
											`${pathname}?page=${+currentPage + 1}&${searchParams
												.toString()
												.replace(`page=${currentPage}`, "")}`
										)
									}
								/>
							</PaginationItem>
						</>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
}
