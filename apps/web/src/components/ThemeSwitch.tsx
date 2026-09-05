import { For } from "solid-js"
import { cx } from "@rollc-util/cx"

export type Mode = "beige" | "light" | "dark"

export type ThemeSwitchProps = {
  value: Mode
  onChange?: (mode: Mode) => void
  /** don't touch document.documentElement */
  local?: boolean
  /** square swatches (ribbon variant) instead of round */
  square?: boolean
}

const modes: readonly (readonly [Mode, string])[] = [
  ["beige", "#E3D6C0"],
  ["light", "#FFFFFF"],
  ["dark", "#17140F"],
]

/** Three swatch dots. Controlled: value + onChange; also sets data-theme on <html> unless `local`. */
export function ThemeSwitch(props: ThemeSwitchProps) {
  const pick = (m: Mode) => {
    props.onChange?.(m)
    if (!props.local) {
      document.documentElement.dataset["theme"] = m
    }
  }

  return (
    <div
      class={cx(
        "inline-flex gap-[5px] p-1 border border-line bg-surface",
        props.square ? "rounded" : "rounded-pill",
      )}
      role="radiogroup"
      aria-label="Color mode"
    >
      <For each={modes}>
        {([m, hex]) => (
          <button
            type="button"
            role="radio"
            aria-checked={props.value === m}
            title={m}
            onClick={() => pick(m)}
            class={cx(
              "w-[18px] h-[18px] border border-line cursor-pointer transition-transform duration-120 hover:scale-110",
              props.square ? "rounded-sm" : "rounded-pill",
              props.value === m && "ring-2 ring-accent ring-offset-1 ring-offset-surface",
            )}
            style={{ background: hex }}
          />
        )}
      </For>
    </div>
  )
}
