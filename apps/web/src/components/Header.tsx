import { For } from "solid-js"
import { Meeple } from "@rollc-ui/Meeple"
import { Button } from "@rollc-ui/Button"
import { ThemeSwitch, type Mode } from "@rollc-ui/ThemeSwitch"

export type HeaderProps = {
  items?: string[]
  mode: Mode
  onModeChange?: (m: Mode) => void
}

/** Site header: mark + wordmark, nav words, theme switch, join button. */
export function Header(props: HeaderProps) {
  return (
    <header class="flex items-center justify-between px-gutter pt-14">
      <a href="/" class="flex items-center gap-3 text-ink hover:text-ink">
        <Meeple size={30} class="text-accent" />
        <span class="font-display text-[22px] tracking-[-.01em]">RollCall</span>
      </a>
      <nav class="flex items-center gap-[30px] text-small text-dim">
        <For each={props.items ?? ["Games", "Nights", "Reviews", "Members"]}>
          {(it) => (
            <a href="#" class="text-dim hover:text-ink">
              {it}
            </a>
          )}
        </For>
        <ThemeSwitch value={props.mode} onChange={props.onModeChange} />
        <Button>Join the club</Button>
      </nav>
    </header>
  )
}
