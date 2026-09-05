import { HexTile } from "@rollc-ui/HexTile"
import { Label } from "@rollc-ui/Label"

export type StatHexProps = { value: string; label: string; accent?: boolean }

/** Small hex with a figure and a label — player count, duration, weight, teach time, rating. */
export function StatHex(props: StatHexProps) {
  return (
    <HexTile size="sm" kind={props.accent ? "stat-accent" : "stat"} class="gap-[2px]">
      <span class="font-display text-[26px] leading-none">{props.value}</span>
      <Label
        size="sm"
        tone={props.accent ? "inherit" : "dim"}
        class={props.accent ? "opacity-80 text-[9px]" : "text-[9px]"}
      >
        {props.label}
      </Label>
    </HexTile>
  )
}
