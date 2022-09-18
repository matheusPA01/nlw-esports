import { CaretLeft, CaretRight } from "phosphor-react";

export function NextArrow(props: any) {
  const { onClick } = props;

  return (
    <CaretRight
      className={`absolute cursor-pointer top-1/2 -translate-y-1/2 left-full text-zinc-500 ml-10`}
      onClick={onClick}
      size={48}
    />
  )
}

export function PrevArrow(props: any) {
  const { onClick } = props;

  return (
    <CaretLeft
      className={`absolute cursor-pointer top-1/2 -translate-y-1/2 right-full text-zinc-500 mr-10`}
      onClick={onClick}
      size={48}
    />
  )
}