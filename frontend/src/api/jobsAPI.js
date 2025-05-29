export const jobsCreatedByPromise = email => {
    return fetch(`https://job-portal-umber-chi.vercel.app/jobs?email=${email}`)
    .then(response => response.json())
}