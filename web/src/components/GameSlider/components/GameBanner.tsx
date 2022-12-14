interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a className="relative rounded-lg">
      <img src={props.bannerUrl} alt="" className="w-full sm:max-w-none" />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{props.title}</strong>
        <span className="text-sm text-zinc-300 block">{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  )
}