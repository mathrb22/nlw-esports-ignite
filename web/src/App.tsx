import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';

import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { GameController } from 'phosphor-react';
import Input from './components/Form/Input';
import CreateAdModal from './components/CreateAdModal';

export interface Game {
	id: string;
	title: string;
	bannerUrl: string;
	_count: {
		ads: number;
	};
}

function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		fetch('http://localhost:3333/games')
			.then((response) => response.json())
			.then((data) => setGames(data));
	}, []);

	return (
		<div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
			<img src={logoImg} alt='NLW eSports Logo' />
			<h1 className='text-5xl sm:text-5xl md:text-6xl lg:text-6xl text-white text-center font-black mt-20 mx-8'>
				Seu{' '}
				<span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span>{' '}
				está aqui.
			</h1>

			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-16 mx-8 max-w-6xl'>
				{games.map((game) => (
					<GameBanner
						key={game.id}
						bannerUrl={game.bannerUrl}
						title={game.title}
						adsCount={game._count.ads}
					/>
				))}
			</div>

			<Dialog.Root>
				<CreateAdBanner />
				<CreateAdModal />
			</Dialog.Root>
		</div>
	);
}

export default App;
