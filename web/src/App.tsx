import * as Dialog from '@radix-ui/react-dialog'
import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';

import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameSlider } from './components/GameSlider/index';

export function App() {
  return (
    <div className="w-[300px] sm:w-[440px] md:w-[568px] lg:w-[800px] xl:w-[1080px] 2xl:w-[1340px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-center md:text-start text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <GameSlider />

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}