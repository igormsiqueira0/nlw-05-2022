import { MailAdapter } from './../adapters/mailAdapter';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prismaFeedbacksRepository';
import { FeedbacksRepository } from './../repositories/feedbacksRepository';
interface SubmitFeedbackRequest {
	type: string;
	comment: string;
	screenshot?: string;
}

export class SubmitFeedback {
	constructor(
		private feedbacksRepository: FeedbacksRepository,
		private mailAdapter: MailAdapter
	) {}

	async init(req: SubmitFeedbackRequest) {
		const { type, comment, screenshot } = req;

		await this.feedbacksRepository.create({
			type,
			comment,
			screenshot,
		});

		await this.mailAdapter.sendMail({
			subject: 'Novo feedback',
			body: [
				`<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
				`<p>Tipo do feedback: ${type}</p>`,
				`<p>Comentário: ${comment}</p>`,
				`<p>Screenshot: ${
					screenshot
						? `<img src="${screenshot}" />`
						: 'Nenhuma screenshot enviada'
				}</p>`,
				`<div>`,
			].join('\n'),
		});
	}
}
