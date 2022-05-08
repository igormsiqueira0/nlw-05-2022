import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';
import React from 'react';
import Loading from '../Loading';

interface ScreenshotButtonProps {
	screenshot: string | null;
	onScreenshotTook: (screenshot: string | null) => void;
}

export default function ScreenshotButton({
	screenshot,
	onScreenshotTook,
}: ScreenshotButtonProps) {
	const [isTakingScreenShot, setIsTakingScreenShot] = React.useState(false);

	async function handleTakeScreenshot() {
		setIsTakingScreenShot(true);

		const canvas = await html2canvas(document.documentElement);
		const base64image = canvas.toDataURL('image/png');

		onScreenshotTook(base64image);
		setIsTakingScreenShot(false);
	}

	if (screenshot) {
		return (
			<button
				type="button"
				className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
				style={{ backgroundImage: `url(${screenshot})` }}
				onClick={() => onScreenshotTook(null)}
			>
				<Trash weight="fill" />
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={handleTakeScreenshot}
			className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
		>
			{isTakingScreenShot ? <Loading /> : <Camera size="24" />}
		</button>
	);
}
