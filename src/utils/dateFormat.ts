export function getCurrentDateDBFormat() {
	const date = new Date();

	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

export function getDateInOurTimezone(dateString: string) {
	const date = new Date(dateString);

	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
