import { createResource, Show } from "solid-js"
import type { HealthResponse } from "@rollc/api-contract"
import { useQuery } from "@tanstack/solid-query"
import { Meeple } from "@rollc-ui/Meeple"

async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch("/api/health")
  if (!res.ok) {
    throw new Error(`health check failed: ${res.status}`)
  }
  return res.json()
}

export function Home() {
  const { isLoading, error, data: status } = useQuery(() => ({
    queryKey: ['getHealth'],
    queryFn: fetchHealth
  }));

  if (isLoading) 
    return <Meeple />

  return (
    <section class="animate-fade-up">
      <p class="eyebrow text-accent">On the table</p>
      <h1 class="mt-4 font-display text-display-md">Someone always knows the rules.</h1>
      <p class="mt-6 max-w-[52ch] text-lead text-dim">
        Track what the shelf is worth, argue about the endgame scoring, and know
        when the next night is.
      </p>
      <div class="mt-10 flex items-baseline gap-3 border-t border-line pt-4">
        <span class="label text-dim">Backend</span>
        <span class="font-mono text-small">
          <Show when={!isLoading} fallback="checking...">
            <Show when={!error} fallback={<span class="text-accent">unreachable</span>}>
              {status}
            </Show>
          </Show>
        </span>
      </div>
    </section>
  )
}
