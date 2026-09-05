import { splitProps, type JSX } from "solid-js"
import { cx } from "@rollc-util/cx"

export type MeepleProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
  /** px, default 24 */
  size?: number
  /** gentle idle bob animation (loading / empty states) */
  bob?: boolean
}

/** The club mascot. Inherits color via currentColor. */
export function Meeple(props: MeepleProps) {
  const [l, rest] = splitProps(props, ["size", "bob", "class"])
  return (
    <svg
      viewBox="0 0 24 24"
      width={l.size ?? 24}
      height={l.size ?? 24}
      fill="currentColor"
      aria-hidden="true"
      class={cx("shrink-0", l.bob && "animate-bob", l.class)}
      {...rest}
    >
      <path d="M12 2a3.3 3.3 0 0 1 2.7 5.2c2.5.9 4.2 3.1 4.6 5.8l.4 2.6H4.3l.4-2.6c.4-2.7 2.1-4.9 4.6-5.8A3.3 3.3 0 0 1 12 2Z" />
      <path d="M2.4 22.2c1.6-3.5 5.1-5.5 9.6-5.5s8 2 9.6 5.5Z" />
    </svg>
  )
}
