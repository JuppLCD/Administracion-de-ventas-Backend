export class UserCode {
	static generateCode = () => {
		const possibleValues = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const lenCode = 10;

		let newCode = '';

		for (let i = 0; i < lenCode; i++) {
			const randomIndex = Math.floor(Math.random() * possibleValues.length);
			newCode += possibleValues[randomIndex];
		}

		const new_expire_code = this.codeExpires();
		return { newCode, new_expire_code };
	};

	static codeExpires = () => {
		const date = new Date();

		// 15 minutes for the code to expire
		date.setMinutes(15);

		return `${date.getTime()}`;
	};

	static isExpires = (expire_code: string) => {
		const time = Date.now();

		return time > Number(expire_code);
	};
}
