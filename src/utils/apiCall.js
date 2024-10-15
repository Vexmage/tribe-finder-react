
const timeoutDuration = 5000;

export async function apiCall(url) {
    const request = new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.ok ? response.json() : reject("Failed to fetch"))
            .then(resolve)
            .catch(reject);
    });
  
    const timeout = new Promise((_, reject) => setTimeout(() => reject("Request timed out"), timeoutDuration));

    return Promise.race([request, timeout]);
}
