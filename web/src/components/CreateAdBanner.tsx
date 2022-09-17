import { MagnifyingGlassPlus } from 'phosphor-react';

export default function CreateAdBanner() {
	return (
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
	);
}
