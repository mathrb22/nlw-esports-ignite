import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import GameBanner from './components/GameBanner';
import CreateAdBanner from './components/CreateAdBanner';

import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { GameController } from 'phosphor-react';
import Input from './components/Form/Input';

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

				<Dialog.Portal>
					<Dialog.Overlay className='bg-black/60 inset-0 fixed' />
					<Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[520px] shadow-lg shadow-black/25'>
						<Dialog.Title className='text-3xl font-black'>
							Publique um anúncio
						</Dialog.Title>
						<form className='mt-8 flex flex-col gap-4'>
							<div className='flex flex-col gap-2'>
								<label htmlFor='game' className='font-semibold'>
									Qual o game?
								</label>
								<Input id='game' placeholder='Selecione o game que deseja jogar' />
							</div>

							<div className='flex flex-col gap-2'>
								<label htmlFor='name' className='font-semibold'>
									Seu nome (ou nickname)
								</label>
								<Input id='name' placeholder='Como te chamam dentro do game?' />
							</div>

							<div className='grid grid-cols-2 gap-6'>
								<div className='flex flex-col gap-2'>
									<label htmlFor='yearsPlaying' className='font-semibold'>
										Joga há quantos anos?
									</label>
									<Input id='yearsPlaying' placeholder='Tudo bem ser ZERO' />
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor='discord' className='font-semibold'>
										Qual seu Discord?
									</label>
									<Input id='discord' placeholder='Usuario#0000' />
								</div>
							</div>

							<div className='flex gap-6'>
								<div className='flex flex-col gap-2'>
									<label htmlFor='weekDays' className='font-semibold'>
										Quando costuma jogar?
									</label>

									<div className='grid grid-cols-4 gap-2'>
										<button className='w-8 h-8 rounded-lg bg-zinc-900' title='Domingo'>
											D
										</button>
										<button className='w-8 h-8 rounded-lg bg-zinc-900' title='Segunda'>
											S
										</button>
										<button className='w-8 h-8 rounded-lg bg-zinc-900' title='Terça'>
											T
										</button>
										<button className='w-8 h-8 rounded-lg bg-zinc-900' title='Quarta'>
											Q
										</button>
										<button className='w-8 h-8 rounded-lg bg-zinc-900' title='Quinta'>
											Q
										</button>
										<button className='w-8 h-8 rounded-lg bg-zinc-900' title='Sexta'>
											S
										</button>
										<button className='w-8 h-8 rounded-lg bg-zinc-900' title='Sábado'>
											S
										</button>
									</div>
								</div>

								<div className='flex flex-col gap-2 flex-1'>
									<label htmlFor='hoursStart' className='font-semibold'>
										Qual horário do dia?
									</label>
									<div className='grid grid-cols-2 gap-2'>
										<Input id='hoursStart' type='time' placeholder='De' />
										<Input id='hoursEnd' type='time' placeholder='Até' />
									</div>
								</div>
							</div>

							<div className='mt-2 flex gap-2 text-sm'>
								<Input type='checkbox' name='useVoiceChannel' id='useVoiceChannel' />
								Costumo me conectar ao chat de voz
							</div>

							<footer className='mt-4 flex gap-4 justify-end'>
								<Dialog.Close
									type='button'
									className='bg-zinc-500 rounded-md px-5 h-12 ripple-bg-zinc-400'>
									Cancelar
								</Dialog.Close>
								<button
									type='button'
									className='bg-violet-500 rounded-md px-5 h-12 flex items-center gap-3 ripple-bg-violet-600'>
									<GameController size={24} />
									Encontrar duo
								</button>
							</footer>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}

export default App;
