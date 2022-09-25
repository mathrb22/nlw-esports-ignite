import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {
	ArrowsVertical,
	Check,
	CircleNotch,
	GameController,
} from 'phosphor-react';
import { Combobox, Transition } from '@headlessui/react';
import Input from './Form/Input';
import { FormEvent, Fragment, useEffect, useState } from 'react';
import { IGame } from '../interfaces/game';
import axios from 'axios';
import { Ad } from '../interfaces/ad';
import toast, { Toaster } from 'react-hot-toast';

interface CreateAdModalProps {
	onCloseModal: () => void;
}

export default function CreateAdModal({ onCloseModal }: CreateAdModalProps) {
	const [games, setGames] = useState<IGame[]>([]);
	const [selectedGame, setSelectedGame] = useState<IGame | undefined>(undefined);
	const [query, setQuery] = useState('');
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
	const [isCreatingAd, setIsCreatingAd] = useState<boolean>(false);

	const filteredGames =
		query == ''
			? games
			: games.filter((game) =>
					game.title.toLowerCase().includes(query.toLowerCase())
			  );

	useEffect(() => {
		axios('http://localhost:3333/games').then((response) =>
			setGames(response.data)
		);
	}, []);

	function handleCloseModal() {
		setSelectedGame(undefined);
		setWeekDays([]);
		setUseVoiceChannel(false);
		onCloseModal();
	}

	async function handleCreateAd(event: FormEvent<HTMLFormElement>) {
		setIsCreatingAd(true);
		event.preventDefault();
		console.log('submit form');

		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
		console.log(data);
		console.log(data['game[id]']);

		if (!data.name) return;

		try {
			await axios.post<Ad>(`http://localhost:3333/games/${data['game[id]']}/ads`, {
				name: data.name,
				yearsPlaying: Number(data.yearsPlaying),
				discord: data.discord,
				weekDays: weekDays.map(Number),
				hoursStart: data.hoursStart,
				hoursEnd: data.hoursEnd,
				useVoiceChannel: useVoiceChannel,
			});
			setIsCreatingAd(false);
			toast.success('Anúncio criado com sucesso!');
			handleCloseModal();
		} catch (error) {
			setIsCreatingAd(false);
			toast.error('Erro ao criar anúncio');
		}
	}

	return (
		<Dialog.Portal>
			<Dialog.Overlay className='bg-black/60 inset-0 fixed' />
			<Dialog.Content
				onInteractOutside={handleCloseModal}
				onCloseAutoFocus={handleCloseModal}
				className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[90vw] max-w-[520px] shadow-lg shadow-black/25 animate-fade-in'>
				<Dialog.Title className='text-3xl font-black'>
					Publique um anúncio
				</Dialog.Title>
				<form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<label htmlFor='game' className='font-semibold'>
							Qual o game?
						</label>

						<Combobox value={selectedGame} onChange={setSelectedGame} name='game'>
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
						<Input
							name='name'
							id='name'
							placeholder='Como te chamam dentro do game?'
						/>
					</div>

					<div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='yearsPlaying' className='font-semibold'>
								Joga há quantos anos?
							</label>
							<Input
								name='yearsPlaying'
								id='yearsPlaying'
								placeholder='Tudo bem ser ZERO'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='discord' className='font-semibold'>
								Qual seu Discord?
							</label>
							<Input name='discord' id='discord' placeholder='Usuario#0000' />
						</div>
					</div>

					<div className='flex flex-col xxs:flex-row xs-flex-row sm-flex-row md-flex-row lg-flex-row gap-6'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='weekDays' className='font-semibold'>
								Quando costuma jogar?
							</label>

							<ToggleGroup.Root
								type='multiple'
								className='grid grid-cols-4 gap-2'
								value={weekDays}
								onValueChange={setWeekDays}>
								<ToggleGroup.Item
									value='0'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900 '
									}`}
									title='Domingo'>
									D
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='1'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900 '
									}`}
									title='Segunda'>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='2'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900 '
									}`}
									title='Terça'>
									T
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='3'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900 '
									}`}
									title='Quarta'>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='4'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900 '
									}`}
									title='Quinta'>
									Q
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='5'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900 '
									}`}
									title='Sexta'>
									S
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value='6'
									type='button'
									className={`w-8 h-8 rounded-lg ${
										weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900 '
									}`}
									title='Sábado'>
									S
								</ToggleGroup.Item>
							</ToggleGroup.Root>
						</div>

						<div className='flex flex-col gap-2 flex-1'>
							<label htmlFor='hoursStart' className='font-semibold'>
								Qual horário do dia?
							</label>
							<div className='grid grid-cols-2 gap-2'>
								<Input
									name='hoursStart'
									id='hoursStart'
									type='time'
									placeholder='De'
									className='appearance-none'
								/>
								<Input name='hoursEnd' id='hoursEnd' type='time' placeholder='Até' />
							</div>
						</div>
					</div>

					<div className='mt-2 flex items-center gap-2 text-sm'>
						<Checkbox.Root
							className='w-6 h-6 p-1 rounded bg-zinc-900'
							id='voiceChat'
							checked={useVoiceChannel}
							onCheckedChange={(checked) => {
								if (checked == true) setUseVoiceChannel(true);
								else setUseVoiceChannel(false);
							}}>
							<Checkbox.Indicator>
								<Check className='w-4 h-4 text-emerald-400' />
							</Checkbox.Indicator>
						</Checkbox.Root>
						<label htmlFor='voiceChat'>Costumo me conectar ao chat de voz</label>
					</div>

					<footer className='mt-4 flex-col xxs:flex-row xs-flex-row sm-flex-row md-flex-row lg-flex-row flex gap-4 justify-end'>
						<Dialog.Close
							onClick={handleCloseModal}
							type='button'
							className='bg-zinc-500 rounded-md px-5 h-12 flex items-center justify-center ripple-bg-zinc-400'>
							Cancelar
						</Dialog.Close>
						<button
							type='submit'
							disabled={isCreatingAd}
							className={`bg-violet-500 rounded-md px-5 h-12 flex items-center justify-center gap-3 ${
								isCreatingAd ? 'disabled:text-zinc-300' : 'ripple-bg-violet-600'
							}`}>
							{isCreatingAd ? (
								<>
									<CircleNotch size={24} className='animate-spin' />
									Enviando...
								</>
							) : (
								<>
									<GameController size={24} />
									Encontrar duo
								</>
							)}
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
