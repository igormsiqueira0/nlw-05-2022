import { ArrowLeft } from 'phosphor-react';
import React, { FormEvent } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { api } from '../../../lib/api';
import { CloseButton } from '../../CloseButton';
import Loading from '../../Loading';
import ScreenshotButton from '../ScreenshotButton';

interface FeedbackContentStepProps {
	feedbackType: FeedbackType;
	onFeedbackRestartRequested: () => void;
	onFeedbackSent: () => void;
}

export default function FeedbackContentStep({
	feedbackType,
	onFeedbackRestartRequested,
	onFeedbackSent,
}: FeedbackContentStepProps) {
	const feedbackTypeInfo = feedbackTypes[feedbackType];
	const [screenshot, setScreenshot] = React.useState<string | null>(null);
	const [comment, setComment] = React.useState('');
	const [isSendingFeedback, setIsSendingFeedback] = React.useState(false);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setIsSendingFeedback(true);

		// console.log({
		// 	screenshot,
		// 	comment,
		// });

		await api.post('/feedbacks', {
			type: feedbackType,
			comment,
			screenshot,
		});

		setIsSendingFeedback(false);
		onFeedbackSent();
	}

	return (
		<>
			<header>
				<button
					type="button"
					className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
					onClick={onFeedbackRestartRequested}
				>
					<ArrowLeft weight="bold" size="16" />
				</button>

				<span className="text-xl leading-6 flex items-center gap-2">
					<img
						src={feedbackTypeInfo.image.source}
						alt={feedbackTypeInfo.image.alt}
						className="h-6 w-6"
					/>
					{feedbackTypeInfo.title}
				</span>

				<CloseButton />
			</header>

			<form className="my-4 w-full" onSubmit={handleSubmit}>
				<textarea
					className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
					placeholder="Conte com detalhes o que está acontecendo..."
					onChange={({ target }) => setComment(target.value)}
				/>

				<footer className="flex gap-2 mt-2">
					<ScreenshotButton
						onScreenshotTook={setScreenshot}
						screenshot={screenshot}
					/>

					<button
						type="submit"
						className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
						disabled={comment.length === 0 || isSendingFeedback}
					>
						{isSendingFeedback ? <Loading /> : 'Enviar feedback'}
					</button>
				</footer>
			</form>
		</>
	);
}
