import { Show, type JSX } from "solid-js"
import { Card } from "@rollc-ui/Card"
import { Label } from "@rollc-ui/Label"
import { Stars } from "@rollc-ui/Stars"

export type NoteCardProps = {
  /** auto-assigned anonymous handle, e.g. "Patient Rook" */
  handle: string
  game?: string
  /** 0–5 */
  rating?: number
  /** e.g. "14 minutes ago · 2 replies" */
  meta?: string
  tone?: "surface" | "bg"
  children: JSX.Element
}

/** An anonymous note: plum handle, optional game, optional star rating, one or two sentences. */
export function NoteCard(props: NoteCardProps) {
  // Wrapped rather than passed bare so a rating of 0 still renders (0 is falsy to Show).
  const rating = () => (props.rating === undefined ? undefined : { value: props.rating })

  return (
    <Card tone={props.tone ?? "bg"} class="px-[17px] py-[15px] flex flex-col gap-2">
      <div class="flex items-baseline justify-between">
        <Label size="sm" tone="plum">
          {props.handle}
          <Show when={props.game}> · {props.game}</Show>
        </Label>
        <Show when={rating()}>{(r) => <Stars value={r().value} />}</Show>
      </div>
      <p class="m-0 text-small text-ink">{props.children}</p>
      <Show when={props.meta}>
        <span class="text-micro text-dim">{props.meta}</span>
      </Show>
    </Card>
  )
}
