import { createResource, Show } from "solid-js"
import type { HealthResponse } from "@rollc/api-contract"

async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch("/api/health")
  if (!res.ok) {
    throw new Error(`health check failed: ${res.status}`)
  }
  return res.json()
}

export function App() {
  const [health] = createResource(fetchHealth)

  return (
    <main>
      <h1>RollCall</h1>
      <p>
        Backend:{" "}
        <Show when={!health.loading} fallback="checking...">
          <Show when={!health.error} fallback="unreachable">
            {health()?.status}
          </Show>
        </Show>
      </p>
    </main>
  )
}
