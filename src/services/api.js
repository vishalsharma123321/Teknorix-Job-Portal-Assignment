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


export async function fetchJobs(params = {}, directJobId = false) {
  // 🔹 Only fetch directly by job ID if explicitly requested
  if (directJobId && params.q && /^\d+$/.test(params.q.trim())) {
    try {
      const res = await fetch(`${BASE}/api/v1/jobs/${params.q.trim()}`);
      if (!res.ok) throw new Error('Failed to fetch job by ID');
      const job = await res.json();
      return Array.isArray(job) ? job : [job];
    } catch (err) {
      console.error('Error fetching job by ID:', err);
      return [];
    }
  }

  // 🔹 Normal jobs fetch
  const q = buildQuery({ ...params, q: undefined }); // remove q before calling API
  const res = await fetch(`${BASE}/api/v1/jobs${q}`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  let jobs = await res.json();

  // 🔹 Client-side filtering
  if (params.q && typeof params.q === 'string') {
    const searchTerm = params.q.toLowerCase();
    jobs = jobs.filter(job => {
      const searchableText = [
        job.title,
        job.id?.toString(),
        job.code,
        job.company,
        job.industry,
        job.department?.title,
        job.function?.title,
        job.location?.city,
        job.location?.state,
        job.description?.replace(/<[^>]*>/g, ''),
        job.experience,
        job.type,
      ].filter(Boolean).join(' ').toLowerCase();

      return searchableText.includes(searchTerm);
    });
  }

  return jobs;
}







// Fixed function name to match JobDetailsPage import
export async function fetchJobDetails(id) {
  const res = await fetch(`${BASE}/api/v1/jobs/${id}`)
  if (!res.ok) throw new Error('Failed to fetch job details')
  const json = await res.json()
  // API returns array in example, normalize to first item
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