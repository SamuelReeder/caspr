export const apiClient = async (
	endpoint: string,
	options: RequestInit = {}
) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;

	const response = await fetch(`${baseUrl}${endpoint}`, {
		...options
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message);
	}

	return response;
};
