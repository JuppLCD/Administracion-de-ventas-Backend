export function addZero(n: number, repeat: number = 1) {
	if (n < 10 || repeat !== 1) {
		return '0'.repeat(repeat) + n;
	}
	return `${n}`;
}
