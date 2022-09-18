import { View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GameParams } from '../../@types/navigation';

import { Entypo } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';

export function Game() {
	const navigation = useNavigation();
	const route = useRoute();

	function handleGoBack() {
		navigation.goBack();
	}

	const game = route.params as GameParams;

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} />
					</TouchableOpacity>

					<Image source={logoImg} style={styles.logo} />
					<View style={styles.right} />
				</View>

				<Image
					source={{ uri: game.bannerUrl }}
					style={styles.cover}
					resizeMode='cover'
				/>

				<Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />
			</SafeAreaView>
		</Background>
	);
}
