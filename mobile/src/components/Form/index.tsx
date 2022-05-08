import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { theme } from '../../theme';
import { FeedbackType } from '../../type';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/api';

interface Props {
	feedbackType: FeedbackType;
	cancelFeedback: () => void;
	onFeedbackSent: () => void;
}

export function Form({ feedbackType, cancelFeedback, onFeedbackSent }: Props) {
	const feedbackTypeInfo = feedbackTypes[feedbackType];
	const [screenshot, setScreenshot] = React.useState<string | null>(null);
	const [isSending, setIsSending] = React.useState(false);
	const [comment, setComment] = React.useState('');

	function handleScreenshot() {
		captureScreen({
			format: 'jpg',
			quality: 0.8,
		})
			.then((uri) => setScreenshot(uri))
			.catch((error) => console.log(error));
	}

	function handleScreenshotRemove() {
		setScreenshot(null);
	}

	async function handleSubmit() {
		if (isSending) {
			return;
		}

		const screenshotBase64 =
			screenshot &&
			(await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }));

		try {
			setIsSending(true);
			await api.post('/feedbacks', {
				type: feedbackType,
				screenshot: `data:image/png;base64, ${screenshotBase64}`,
				comment,
			});

			onFeedbackSent();
		} catch (err) {
			console.log(err);
		} finally {
			setIsSending(false);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={cancelFeedback}>
					<ArrowLeft
						size={24}
						weight="bold"
						color={theme.colors.text_secondary}
					/>
				</TouchableOpacity>

				<View style={styles.titleContainer}>
					<Image source={feedbackTypeInfo.image} style={styles.image} />
					<Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
				</View>
			</View>

			<TextInput
				multiline
				style={styles.input}
				placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
				placeholderTextColor={theme.colors.text_secondary}
				onChangeText={setComment}
			/>

			<View style={styles.footer}>
				<ScreenshotButton
					onTakeShot={handleScreenshot}
					onRemoveShot={handleScreenshotRemove}
					screenshot={screenshot}
				/>

				<Button isLoading={isSending} onPress={handleSubmit} />
			</View>
		</View>
	);
}
