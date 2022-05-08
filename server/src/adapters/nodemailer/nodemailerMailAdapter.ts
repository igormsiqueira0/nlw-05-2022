import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from './../mailAdapter';

const transport = nodemailer.createTransport({
	host: 'smtp.mailtrap.io',
	port: 2525,
	auth: {
		user: 'c5d22f2616a843',
		pass: '8104c249bef92e',
	},
});

export class NodemailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData) {
		await transport.sendMail({
			from: 'Equipe Feedget <feedget@suporte.com>',
			to: 'Igor Marinho <zigniitionz686@gmail.com>',
			subject,
			html: body,
		});
	}
}
