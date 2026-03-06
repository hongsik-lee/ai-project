import "./share.scss"
import { buildPageUrl } from "../../utils/router"

function bindShareLinks() {
  const linkElements = document.querySelectorAll("[data-route-link]")

  linkElements.forEach((element) => {
    const routeKey = element.dataset.routeLink
    if (!routeKey) return

    const routeId = element.dataset.routeId
    const queryParams = routeId ? { id: routeId } : undefined

    element.setAttribute("href", buildPageUrl(routeKey, queryParams))
  })
}

bindShareLinks()
