import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.MAILER_HOST ?? 'smtp.ethereal.email',
	port: Number(process.env.MAILER_PORT ?? 587),
	secure: process.env.MAILER_SECURE === 'true',
	auth: {
		user: process.env.MAILER_EMAIL,
		pass: process.env.MAILER_PASSWORD,
	},
});

export default transporter;

export const sendCode = ({ code, email }: { code: string; email: string }) => {
	return transporter.sendMail({
		from: `"La mejor aplicacion" <${process.env.MAILER_EMAIL}>`,
		to: email,
		subject: 'Login code ✔',
		html: `<b>Your Code is: ${code}</b>`,
	});
};