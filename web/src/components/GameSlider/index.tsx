import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css'

import { useCallback, useEffect, useState } from "react"
import Slider from 'react-slick';
import { api } from "../../lib/axios";

import { GameBanner } from "./components/GameBanner"
import { NextArrow, PrevArrow } from "./components/Arrow";
import { Spinner } from "../Spinner";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function GameSlider() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    rows: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        },
      },
    ]
  };

  const getGames = useCallback(async () => {
    const { data } = await api.get('games')
    setGames(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getGames()
  }, [])


  return (
    <div className="w-[300px] sm:w-[440px] md:w-[568px] lg:w-[800px] xl:w-[1080px] 2xl:w-[1340px] mt-16">
      {isLoading ? <Spinner /> :
        <Slider {...settings}>
          {
            games.map(game => {
              return (
                <div className="" key={game.id}>
                  <GameBanner
                    key={game.id}
                    title={game.title}
                    bannerUrl={game.bannerUrl}
                    adsCount={game._count.ads}

                  />
                </div>
              )
            })
          }
        </Slider>}
    </div >
  )
}