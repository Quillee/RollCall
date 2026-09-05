import { splitProps, Show, type JSX } from "solid-js"
import { cx } from "@rollc-util/cx"

export type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
}

/** Text input / search. Flat, line border, accent focus ring. */
export function Input(props: InputProps) {
  const [l, rest] = splitProps(props, ["class", "label", "hint"])
  return (
    <label class="flex flex-col gap-1.5">
      <Show when={l.label}>
        <span class="label text-dim">{l.label}</span>
      </Show>
      <input
        class={cx(
          "w-full rounded border border-line bg-surface text-ink text-body px-3.5 py-2.5 placeholder:text-dim outline-none focus:border-accent focus:ring-2 focus:ring-accent-soft transition-colors duration-200",
          l.class,
        )}
        {...rest}
      />
      <Show when={l.hint}>
        <span class="text-caption text-dim">{l.hint}</span>
      </Show>
    </label>
  )
}
