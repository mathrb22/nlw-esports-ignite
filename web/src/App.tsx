import './styles/main.css';
import { MagnifyingGlassPlus } from 'phosphor-react';

import logoImg from './assets/logo-nlw-esports.svg';

function App() {
	return (
		<div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
			<img src={logoImg} alt='NLW eSports Logo' />
			<h1 className='text-5xl sm:text-5xl md:text-6xl lg:text-6xl text-white text-center font-black mt-20 mx-8'>
				Seu{' '}
				<span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span>{' '}
				está aqui.
			</h1>

			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-16 mx-8 max-w-6xl'>
				<a
					href=''
					className='relative rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
					<img src='/game1.png' alt='' />

					<div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
						<strong className='font-bold text-white block'>League of Legends</strong>
						<span className='text-zinc-300 block'>4 anúncios</span>
					</div>
				</a>
				<a
					href=''
					className='relative rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
					<img src='/game2.png' alt='' />

					<div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
						<strong className='font-bold text-white block'>Apex Legends</strong>
						<span className='text-zinc-300 block'>4 anúncios</span>
					</div>
				</a>
				<a
					href=''
					className='relative rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
					<img src='/game3.png' alt='' />

					<div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
						<strong className='font-bold text-white block'>Counter Strike</strong>
						<span className='text-zinc-300 block'>4 anúncios</span>
					</div>
				</a>
				<a
					href=''
					className='relative rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
					<img src='/game4.png' alt='' />

					<div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
						<strong className='font-bold text-white block'>World of Warcraft</strong>
						<span className='text-zinc-300 block'>4 anúncios</span>
					</div>
				</a>
				<a
					href=''
					className='relative rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
					<img src='/game5.png' alt='' />

					<div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
						<strong className='font-bold text-white block'>Dota 2</strong>
						<span className='text-zinc-300 block'>4 anúncios</span>
					</div>
				</a>
				<a
					href=''
					className='relative rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
					<img src='/game6.png' alt='' />

					<div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
						<strong className='font-bold text-white block'>Fortnite</strong>
						<span className='text-zinc-300 block'>4 anúncios</span>
					</div>
				</a>
			</div>

			<div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8 mx-8 '>
				<div className='bg-[#2A2634] px-8 py-6 flex gap-8 sm:gap-8 md:gap-4 lg:gap-4 2xl:gap-4 flex-col justify-between sm:flex-col md:flex-row md:items-center lg:flex-row lg:items-center 2xl:flex-row 2xl:items-center '>
					<div>
						<strong className='text-2xl text-white font-black block'>
							Não encontrou seu duo?
						</strong>
						<span className='text-zinc-400 block mt-2'>
							Publique um anúncio para encontrar novos players!
						</span>
					</div>

					<button className='py-3 px-4 bg-violet-500 text-white rounded hover:bg-violet-600 duration-300 ease-in-out flex items-center justify-center gap-3 w-full sm:w-full md:w-auto lg:w-auto 2xl:w-auto'>
						<MagnifyingGlassPlus size={24} />
						Publicar anúncio
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
