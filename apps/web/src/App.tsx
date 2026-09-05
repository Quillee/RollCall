import { A, type RouteSectionProps } from "@solidjs/router"
import { Meeple } from "@rollc-ui/Meeple"

export function App(props: RouteSectionProps) {
  return (
    <div class="min-h-screen bg-bg text-ink">
      <header class="border-b border-line">
        <div class="mx-auto flex max-w-page items-center justify-between px-gutter py-6">
          <A href="/" class="flex items-center gap-3 font-display text-heading-md text-ink">
            <Meeple size={28} class="text-accent" />
            RollCall
          </A>
          <span class="label text-dim">Board game nights</span>
        </div>
      </header>
      <main class="mx-auto max-w-page px-gutter py-14">{props.children}</main>
    </div>
  )
}
