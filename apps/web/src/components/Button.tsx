import { splitProps, type JSX } from "solid-js"
import { cx } from "@rollc-util/cx"

type ButtonVariant = "primary" | "ink" | "outline" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-terracotta-600 dark:hover:bg-terracotta-500",
  ink: "bg-ink text-bg hover:opacity-90",
  outline: "border border-line text-ink bg-transparent hover:bg-surface",
  ghost: "text-dim hover:text-ink",
}

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-small",
  md: "px-[18px] py-[9px] text-small",
  lg: "px-[26px] py-[14px] text-body",
}

/** Rectangular, 3px radius, medium weight. Primary = terracotta; ink = the hero CTA. */
export function Button(props: ButtonProps) {
  const [l, rest] = splitProps(props, ["variant", "size", "class", "children"])
  return (
    <button
      type="button"
      class={cx(
        "inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-200 ease-club active:translate-y-px disabled:opacity-40 disabled:pointer-events-none",
        variants[l.variant ?? "primary"],
        sizes[l.size ?? "md"],
        l.class,
      )}
      {...rest}
    >
      {l.children}
    </button>
  )
}
