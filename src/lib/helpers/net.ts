export const fetchJson = <T>(
	url: string,
	method = 'GET',
	headers: {} = { 'Content-Type': 'application/json' },
	data: {} | undefined = undefined
) =>
	fetch(url, { method, headers, body: data ? JSON.stringify(data) : undefined })
		.then((res) => res.json())
		.then((data) => data as T);

export const buildUrl = (url: string, params: Record<string, any>) =>
	Object.entries(params).reduce(
		(acc, [key, value]) => (value ? acc + `${key}=${value}&` : acc),
		`${url}?`
	);
