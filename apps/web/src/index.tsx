import { render } from "solid-js/web"
import { Route, Router } from "@solidjs/router"
import { App } from "./App"
import { Home } from "./routes/Home"
import "./design-system/theme.css"

const root = document.getElementById("root")
if (!root) {
  throw new Error("#root element not found")
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
    </Router>
  ),
  root,
)
