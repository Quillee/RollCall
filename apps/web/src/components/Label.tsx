import { splitProps, type JSX } from "solid-js"
import { cx } from "@rollc-util/cx"

type LabelSize = "md" | "sm" | "eyebrow"
type LabelTone = "dim" | "accent" | "plum" | "inherit"

export type LabelProps = JSX.HTMLAttributes<HTMLSpanElement> & {
  size?: LabelSize
  tone?: LabelTone
}

const tones: Record<LabelTone, string> = {
  dim: "text-dim",
  accent: "text-accent",
  plum: "text-plum",
  inherit: "",
}

const sizes: Record<LabelSize, string> = {
  md: "label",
  sm: "label-sm",
  eyebrow: "eyebrow",
}

/** Mono, uppercase, tracked metadata text. tone: dim (default) | accent | plum */
export function Label(props: LabelProps) {
  const [l, rest] = splitProps(props, ["size", "tone", "class", "children"])
  return (
    <span class={cx(sizes[l.size ?? "md"], tones[l.tone ?? "dim"], l.class)} {...rest}>
      {l.children}
    </span>
  )
}
