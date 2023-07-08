import createCode from './createCode';

export class UserCode {
	static generateCode = () => {
		const newCode = createCode();

		const new_expire_code = this.codeExpires();
		return { newCode, new_expire_code };
	};

	static codeExpires = () => {
		const date = new Date();

		// 15 minutes for the code to expire
		date.setMinutes(date.getMinutes() + 15);

		return `${date.getTime()}`;
	};

	static isExpires = (expire_code: string) => {
		const time = Date.now();

		return time > Number(expire_code);
	};
}
