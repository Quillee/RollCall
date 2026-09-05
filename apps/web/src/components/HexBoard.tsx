import { For, splitProps, type JSX } from "solid-js"
import { cx } from "@rollc-util/cx"
import { HexTile, type HexTileProps } from "@rollc-ui/HexTile"

export type HexBoardProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** rows of tile props; children of a tile go in `children` */
  rows: HexTileProps[][]
  /** radial fade toward the edges (board bleeding off the page) */
  fade?: boolean
  /** shift row 0 instead of odd rows */
  shiftFirst?: boolean
}

/** Tessellated pointy-top board. Odd rows auto-shift half a hex. */
export function HexBoard(props: HexBoardProps) {
  const [l, rest] = splitProps(props, ["rows", "fade", "shiftFirst", "class"])
  return (
    <div class={cx("inline-block", l.fade && "board-fade", l.class)} {...rest}>
      <For each={l.rows}>
        {(row, i) => (
          <div
            class={cx(
              "flex",
              i() > 0 && "hex-row",
              (i() % 2 === 0) === !!l.shiftFirst && "hex-row-shift",
            )}
          >
            <For each={row}>{(tile) => <HexTile {...tile} />}</For>
          </div>
        )}
      </For>
    </div>
  )
}
