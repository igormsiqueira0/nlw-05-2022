import React from 'react';
import { Text, View } from 'react-native';
import { Footer } from '../Footer';
import { Option } from '../Option';
import { FeedbackType } from '../../type';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';

interface Props {
	setFeedbackType: (FeedbackType: FeedbackType) => void;
}

export function Options({ setFeedbackType }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Deixe seu feedback</Text>

			<View style={styles.options}>
				{Object.entries(feedbackTypes).map(([key, value]) => (
					<Option
						key={key}
						title={value.title}
						image={value.image}
						onPress={() => setFeedbackType(key as FeedbackType)}
					/>
				))}
			</View>

			<Footer />
		</View>
	);
}
