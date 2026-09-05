import { Rating } from "@rollc-ui/Stars"

export type GameRowProps = {
  title: string
  subtitle: string
  /** "2–4 · 120m" */
  meta: string
  rating: number
}

/** One line of the shelf list: thumb, title + owner line, mono meta, rating. */
export function GameRow(props: GameRowProps) {
  return (
    <div class="grid grid-cols-[56px_1fr_130px_84px] gap-4 items-center py-[15px] border-t border-line last:border-b cursor-pointer hover:bg-surface transition-colors duration-200">
      <div class="w-11 h-11 rounded-sm bg-surface-2" />
      <div class="flex flex-col gap-[3px]">
        <span class="font-display text-title">{props.title}</span>
        <span class="text-caption text-dim">{props.subtitle}</span>
      </div>
      <span class="font-mono text-micro text-dim">{props.meta}</span>
      <span class="text-small text-right">
        <Rating value={props.rating} />
      </span>
    </div>
  )
}
