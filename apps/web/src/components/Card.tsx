import { splitProps, type JSX } from "solid-js"
import { cx } from "@rollc-util/cx"

export type CardProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** which layer the card sits on: use `bg` when the parent is a surface panel */
  tone?: "surface" | "bg"
  /** dashed border for empty slots */
  dashed?: boolean
}

/** Flat card: 1px line, 3px radius, no shadow. tone: bg (on surface) | surface (on bg) */
export function Card(props: CardProps) {
  const [l, rest] = splitProps(props, ["tone", "dashed", "class", "children"])
  return (
    <div
      class={cx(
        "rounded border border-line",
        l.dashed ? "border-dashed" : "border-solid",
        (l.tone ?? "surface") === "surface" ? "bg-surface" : "bg-bg",
        l.class,
      )}
      {...rest}
    >
      {l.children}
    </div>
  )
}
