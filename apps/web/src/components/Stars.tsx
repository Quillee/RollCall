import { Show } from "solid-js"

export type StarsProps = { value: number }

/** ★ rating in accent; value 0–5. */
export function Stars(props: StarsProps) {
  const full = () => Math.round(props.value)
  return (
    <span
      class="text-caption text-accent tracking-[.05em]"
      aria-label={`${props.value} out of 5`}
    >
      {"★".repeat(full()) + "☆".repeat(5 - full())}
    </span>
  )
}

export type RatingProps = { value: number; count?: number }

/** Compact "★ 4.6" figure. */
export function Rating(props: RatingProps) {
  return (
    <span class="text-accent">
      ★ {props.value.toFixed(1)}
      <Show when={props.count}> · {props.count} notes</Show>
    </span>
  )
}
