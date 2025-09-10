const BASE = 'https://demo.jobsoid.com'

function buildQuery(params = {}) {
  const qs = new URLSearchParams()
  if (params.q) qs.set('q', params.q)
  if (params.loc) qs.set('loc', params.loc)
  if (params.dept) qs.set('dept', params.dept)
  if (params.div) qs.set('div', params.div)
  if (params.fun) qs.set('fun', params.fun)
  return qs.toString() ? `?${qs.toString()}` : ''
}

export async function fetchJobs(params = {}) {
  const q = buildQuery(params)
  const res = await fetch(`${BASE}/api/v1/jobs${q}`)
  if (!res.ok) throw new Error('Failed to fetch jobs')
  const json = await res.json()
  return json
}

export async function fetchJobById(id) {
  const res = await fetch(`${BASE}/api/v1/jobs/${id}`)
  if (!res.ok) throw new Error('Failed to fetch job details')
  const json = await res.json()
  return Array.isArray(json) ? json[0] : json
}

export async function fetchDepartments() {
  const res = await fetch(`${BASE}/api/v1/departments`)
  if (!res.ok) throw new Error('Failed to fetch departments')
  return res.json()
}
export async function fetchLocations() {
  const res = await fetch(`${BASE}/api/v1/locations`)
  if (!res.ok) throw new Error('Failed to fetch locations')
  return res.json()
}
export async function fetchFunctions() {
  const res = await fetch(`${BASE}/api/v1/functions`)
  if (!res.ok) throw new Error('Failed to fetch functions')
  return res.json()
}
