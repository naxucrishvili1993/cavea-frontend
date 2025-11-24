export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen ">
			<h1 className="text-6xl font-bold text-white mb-4">404</h1>
			<p className="text-2xl text-white mb-8">Page Not Found</p>
			<a
				href="/inventories"
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
				Go to Inventories
			</a>
		</div>
	);
}
