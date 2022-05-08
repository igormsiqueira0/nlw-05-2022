import React from 'react';
import { ChatTeardropDots } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';

import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';

import { FeedbackType } from '../../type';

function Widget() {
	const bottomSheetRef = React.useRef<BottomSheet>(null);
	const [feedbackType, setFeedbackType] = React.useState<FeedbackType | null>(
		null
	);
	const [isFeedbackSent, setIsFeedbackSent] = React.useState(false);

	function handleOpen() {
		bottomSheetRef.current?.expand();
	}

	function cancelFeedback() {
		setFeedbackType(null);
		setIsFeedbackSent(false);
	}

	function onFeedbackSent() {
		setIsFeedbackSent(true);
	}

	return (
		<>
			<TouchableOpacity style={styles.button} onPress={handleOpen}>
				<ChatTeardropDots
					size={24}
					color={theme.colors.text_on_brand_color}
					weight="bold"
				/>
			</TouchableOpacity>

			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[1, 280]}
				backgroundStyle={styles.modal}
				handleIndicatorStyle={styles.indicator}
			>
				{isFeedbackSent ? (
					<Success onSendAnotherFeedback={cancelFeedback} />
				) : (
					<>
						{feedbackType ? (
							<Form
								feedbackType={feedbackType}
								cancelFeedback={cancelFeedback}
								onFeedbackSent={onFeedbackSent}
							/>
						) : (
							<Options setFeedbackType={setFeedbackType} />
						)}
					</>
				)}
			</BottomSheet>
		</>
	);
}

export default gestureHandlerRootHOC(Widget);
