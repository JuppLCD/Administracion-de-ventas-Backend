import nodemailer from 'nodemailer';

import { ENV } from '../config';

const transporter = nodemailer.createTransport({
	host: ENV.MAILER_HOST,
	port: ENV.MAILER_PORT,
	secure: ENV.MAILER_SECURE,
	auth: {
		user: ENV.MAILER_EMAIL,
		pass: ENV.MAILER_PASSWORD,
	},
});

export default transporter;

export const sendCode = ({ code, email }: { code: string; email: string }) => {
	return transporter.sendMail({
		from: `"La mejor aplicacion" <${ENV.MAILER_EMAIL}>`,
		to: email,
		subject: 'Login code ✔',
		html: `<b>Your Code is: ${code}</b>`,
	});
};
