import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
  return (
    <div className="md:flex md:flex-col pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
      <div className="px-8 py-6 flex flex-col items-center lg:flex-row lg:justify-between lg:items-center bg-[#2A2634]">
        <div>
          <strong className="text-center lg:text-start text-xl sm:text-2xl text-white font-black block">Não encontrou seu duo?</strong>
          <span className="text-center text-sm sm:mt-1 md:mt-0 md:text-base lg:text-start text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
        </div>

        <Dialog.Trigger className="mt-4 lg:mt-0 py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}