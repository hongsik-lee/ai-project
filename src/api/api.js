const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

function normalizePagedResponse(json, fallbackTotal = 0) {
  if (Array.isArray(json)) {
    return {
      data: json,
      total: fallbackTotal || json.length,
    }
  }

  return {
    data: Array.isArray(json?.data) ? json.data : [],
    total: Number(json?.items ?? fallbackTotal ?? 0),
  }
}

function sortByDateDesc(list) {
  return [...list].sort((a, b) => {
    const aTime = Date.parse(a?.date ?? "")
    const bTime = Date.parse(b?.date ?? "")

    if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
      return bTime - aTime
    }

    return String(b?.id ?? "").localeCompare(String(a?.id ?? ""))
  })
}

export async function getPosts({ page = 1, limit = 10 } = {}) {
  const url = new URL(`${BASE_URL}/posts`)
  url.searchParams.set("_page", page)
  url.searchParams.set("_per_page", limit)

  const res = await fetch(url.toString())
  const headerTotal = Number(res.headers.get("X-Total-Count") ?? 0)
  const json = await res.json()
  const { data, total } = normalizePagedResponse(json, headerTotal)

  return { data: sortByDateDesc(data), total }
}

export async function getPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`)
  return res.json()
}

export async function createPost(post) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  })

  return res.json()
}

export async function getComments(postId, { page = 1, limit = 10 } = {}) {
  const url = new URL(`${BASE_URL}/comments`)
  url.searchParams.set("postId", postId)
  url.searchParams.set("_page", page)
  url.searchParams.set("_per_page", limit)

  const res = await fetch(url.toString())
  const headerTotal = Number(res.headers.get("X-Total-Count") ?? 0)
  const json = await res.json()
  const { data, total } = normalizePagedResponse(json, headerTotal)

  return { data: sortByDateDesc(data), total }
}

export async function createComment(comment) {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  })

  return res.json()
}
