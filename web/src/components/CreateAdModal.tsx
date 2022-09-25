import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { ArrowsVertical, Check, GameController } from 'phosphor-react';
import { Combobox, Transition } from '@headlessui/react';
import Input from './Form/Input';
import { Fragment, useState } from 'react';
import { IGame } from '../interfaces/game';

const games: IGame[] = [
	{
		id: 'c8a9f16a-fc36-4b86-858a-7ea6aeffa11d',
		title: 'League of Legends',
		bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/21779-570x760.jpg',
		_count: {
			ads: 1,
		},
	},
	{
		id: '06f605d2-0e58-437f-8260-45879f1f63cb',
		title: 'Fortnite',
		bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/33214-570x760.jpg',
		_count: {
			ads: 2,
		},
	},
	{
		id: 'bda9d528-2852-4d87-98c3-ac355be01598',
		title: 'Counter Strike',
		bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-570x760.jpg',
		_count: {
			ads: 0,
		},
	},
	{
		id: '0e543606-0fb7-4fe1-91e4-e1466f465784',
		title: 'Apex Legends',
		bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/511224-570x760.jpg',
		_count: {
			ads: 0,
		},
	},
	{
		id: '0cf70723-95f1-4659-9232-82da0be6a127',
		title: 'World of Warcraft',
		bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/18122-570x760.jpg',
		_count: {
			ads: 0,
		},
	},
	{
		id: 'ae10d58a-cf7e-44f0-b8cc-3da742232f5b',
		title: 'Dota 2',
		bannerUrl: 'https://static-cdn.jtvnw.net/ttv-boxart/29595-570x760.jpg',
		_count: {
			ads: 0,
		},
	},
];

export default function CreateAdModal() {
	const [selectedGame, setSelectedGame] = useState<IGame>();
	const [query, setQuery] = useState('');

	const filteredGames =
		query == ''
			? games
			: games.filter((game) =>
					game.title.toLowerCase().includes(query.toLowerCase())
			  );

	return (
		<Dialog.Portal>
			<Dialog.Overlay className='bg-black/60 inset-0 fixed' />
			<Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[90vw] max-w-[520px] shadow-lg shadow-black/25 animate-fade-in'>
				<Dialog.Title className='text-3xl font-black'>
					Publique um anúncio
				</Dialog.Title>
				<form className='mt-8 flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<label htmlFor='game' className='font-semibold'>
							Qual o game?
						</label>

						<Combobox value={selectedGame} onChange={setSelectedGame}>
							<div className='relative mt-1'>
								<div className='relative cursor-default overflow-hidden bg-zinc-900 rounded-lg text-sm placeholder:text-zinc-500 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
									<Combobox.Input
										className='w-full bg-zinc-900 py-3 px-4 rounded-lg text-sm placeholder:text-zinc-500 focus:ring-0'
										displayValue={(game: IGame) =>
											game ? game.title : 'Selecione o game'
										}
										onChange={(event) => setQuery(event.target.value)}
									/>
									<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
										<ArrowsVertical
											size={32}
											className='h-5 w-5 text-gray-400'
											aria-hidden='true'
										/>
									</Combobox.Button>
								</div>
								<Transition
									as={Fragment}
									leave='transition ease-in duration-100'
									leaveFrom='opacity-100'
									leaveTo='opacity-0'
									afterLeave={() => setQuery('')}>
									<Combobox.Options
										className='absolute mt-1 max-h-72
                   w-full overflow-auto rounded-md bg-zinc-900 text-zinc-500 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
										{filteredGames.length === 0 && query !== '' ? (
											<div className='relative cursor-default select-none py-2 px-4 text-zinc-500'>
												Nenhum game encontrado
											</div>
										) : (
											<>
												<Combobox.Option
													className={({ active }) =>
														`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
															active ? 'bg-violet-500 text-white' : 'text-zinc-400'
														}`
													}
													value=''>
													Selecione o game
												</Combobox.Option>
												{filteredGames.map((game) => (
													<Combobox.Option
														key={game.id}
														className={({ active }) =>
															`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
																active ? 'bg-violet-500 text-white' : 'text-zinc-200'
															}`
														}
														value={game}>
														{({ selected, active }) => (
															<>
																<div className='flex items-center gap-6'>
																	<img src={game.bannerUrl} alt='' className='h-12 rounded' />
																	<span
																		className={`block truncate ${
																			selected ? 'font-medium' : 'font-normal'
																		}`}>
																		{game.title}
																	</span>
																</div>
																{selected ? (
																	<span
																		className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																			active ? 'text-white' : 'text-emerald-400'
																		}`}>
																		<Check className='h-5 w-5' aria-hidden='true' />
																	</span>
																) : null}
															</>
														)}
													</Combobox.Option>
												))}
											</>
										)}
									</Combobox.Options>
								</Transition>
							</div>
						</Combobox>
					</div>

					<div className='flex flex-col gap-2'>
						<label htmlFor='name' className='font-semibold'>
							Seu nome (ou nickname)
						</label>
						<Input id='name' placeholder='Como te chamam dentro do game?' />
					</div>

					<div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6'>
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

					<div className='flex flex-col xxs:flex-row xs-flex-row sm-flex-row md-flex-row lg-flex-row gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='weekDays' className='font-semibold'>
								Quando costuma jogar?
							</label>

							<div className='grid grid-cols-4 gap-2'>
								<button
									type='button'
									className='w-8 h-8 rounded-lg bg-zinc-900 ripple-bg-zinc-800'
									title='Domingo'>
									D
								</button>
								<button
									type='button'
									className='w-8 h-8 rounded-lg bg-zinc-900 ripple-bg-zinc-800'
									title='Segunda'>
									S
								</button>
								<button
									type='button'
									className='w-8 h-8 rounded-lg bg-zinc-900 ripple-bg-zinc-800'
									title='Terça'>
									T
								</button>
								<button
									type='button'
									className='w-8 h-8 rounded-lg bg-zinc-900 ripple-bg-zinc-800'
									title='Quarta'>
									Q
								</button>
								<button
									type='button'
									className='w-8 h-8 rounded-lg bg-zinc-900 ripple-bg-zinc-800'
									title='Quinta'>
									Q
								</button>
								<button
									type='button'
									className='w-8 h-8 rounded-lg bg-zinc-900 ripple-bg-zinc-800'
									title='Sexta'>
									S
								</button>
								<button
									type='button'
									className='w-8 h-8 rounded-lg bg-zinc-900 ripple-bg-zinc-800'
									title='Sábado'>
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

					<div className='mt-2 flex items-center gap-2 text-sm'>
						<Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900' id='voiceChat'>
							<Checkbox.Indicator>
								<Check className='w-4 h-4 text-emerald-400' />
							</Checkbox.Indicator>
						</Checkbox.Root>
						<label htmlFor='voiceChat'>Costumo me conectar ao chat de voz</label>
					</div>

					<footer className='mt-4 flex-col xxs:flex-row xs-flex-row sm-flex-row md-flex-row lg-flex-row flex gap-4 justify-end'>
						<Dialog.Close
							type='button'
							className='bg-zinc-500 rounded-md px-5 h-12 flex items-center justify-center ripple-bg-zinc-400'>
							Cancelar
						</Dialog.Close>
						<button
							type='button'
							className='bg-violet-500 rounded-md px-5 h-12 flex items-center justify-center gap-3 ripple-bg-violet-600'>
							<GameController size={24} />
							Encontrar duo
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
