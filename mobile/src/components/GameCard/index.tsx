import {
	TouchableOpacity,
	Text,
	ImageBackground,
	ImageSourcePropType,
	TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface GameCardProps {
	id: string;
	name: string;
	ads: string;
	cover: ImageSourcePropType;
}

interface Props extends TouchableOpacityProps {
	game: GameCardProps;
}

export function GameCard({ game, ...rest }: Props) {
	return (
		<TouchableOpacity style={styles.container} {...rest}>
			<ImageBackground source={game.cover} style={styles.cover}>
				<LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
					<Text style={styles.name}>{game.name}</Text>
					<Text style={styles.ads}>{game.ads} anúncios</Text>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
}
