import { splitProps, Show, type JSX } from "solid-js"
import { cx } from "@rollc-util/cx"
import { Meeple } from "@rollc-ui/Meeple"

type HexKind =
  | "nav"
  | "live"
  | "note"
  | "stat"
  | "stat-accent"
  | "forest"
  | "mountain"
  | "plain"
  | "empty"

type HexSize = "md" | "sm" | "lg"

export type HexTileProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** nav = surface tile with ring; live = terracotta; note = plum quote; stat/stat-accent = small figures; forest/mountain/plain = terrain; empty = meeple placeholder */
  kind?: HexKind
  /** md 148×171 (board), sm 118×102 (stats), lg 186×161 (cluster) */
  size?: HexSize
  /** flat-top orientation (for loose clusters, not tessellated boards) */
  flat?: boolean
}

const Tree = () => (
  <svg viewBox="0 0 40 40" width="38" height="38" class="text-forest" fill="currentColor" aria-hidden="true">
    <path d="M20 6 29 21H11zM20 13 32 32H8z" />
    <rect x="18.5" y="30" width="3" height="6" />
  </svg>
)

const Mountain = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
    <path d="M20 11 35 33H5z" class="fill-stone" />
    <path d="M20 11l5.5 8-4.5 4.5-6.5-6.5z" class="fill-rock" />
  </svg>
)

const sizeCls: Record<HexSize, string> = {
  md: "w-hex-w h-hex-h",
  sm: "w-hex-w-sm h-hex-h-sm",
  lg: "w-hex-w-lg h-hex-h-lg",
}

const kindCls: Record<HexKind, string> = {
  nav: "bg-surface shadow-tile-ring text-ink cursor-pointer hover:bg-accent-soft",
  live: "bg-accent text-on-accent cursor-pointer",
  note: "bg-plum text-on-plum cursor-pointer px-5 text-center",
  stat: "bg-surface shadow-tile-ring text-ink",
  "stat-accent": "bg-accent text-on-accent",
  forest: "bg-field",
  mountain: "bg-rock",
  plain: "bg-surface-2",
  empty: "bg-surface-2 text-dim",
}

/** One hexagon. Pointy-top (tessellates in HexBoard rows) or flat-top (standalone clusters). */
export function HexTile(props: HexTileProps) {
  const [l, rest] = splitProps(props, ["kind", "size", "flat", "class", "children"])
  const kind = () => l.kind ?? "nav"
  return (
    <div
      class={cx(
        "shrink-0 flex flex-col items-center justify-center gap-[5px] transition-colors duration-200 ease-club",
        l.flat ? "clip-hex-flat" : "clip-hex",
        sizeCls[l.size ?? "md"],
        kindCls[kind()],
        l.class,
      )}
      {...rest}
    >
      <Show when={kind() === "forest"}>
        <Tree />
      </Show>
      <Show when={kind() === "mountain"}>
        <Mountain />
      </Show>
      <Show when={kind() === "empty"}>
        <Meeple size={26} class="text-line" bob />
      </Show>
      {l.children}
    </div>
  )
}
