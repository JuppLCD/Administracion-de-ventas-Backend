export default function createCode(lenCode: number = 10) {
	const possibleValues = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	let newCode = '';

	for (let i = 0; i < lenCode; i++) {
		const randomIndex = Math.floor(Math.random() * possibleValues.length);
		newCode += possibleValues[randomIndex];
	}

	return newCode;
}
