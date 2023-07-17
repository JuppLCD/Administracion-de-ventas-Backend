export function getCurrentDateDBFormat() {
	const date = new Date();

	const year = date.getFullYear();
	const month = addZero(date.getMonth() + 1);
	const day = addZero(date.getDate());
	const hours = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	const seconds = addZero(date.getSeconds());

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function addZero(n: number, repeat: number = 1) {
	if (n < 10) {
		return '0'.repeat(repeat) + n;
	}
	return `${n}`;
}
