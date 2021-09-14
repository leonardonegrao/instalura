async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...options,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Falha em pegar os dados do servidor');
  });
}

export const loginService = {
  async login({ username, password }) {
    return HttpClient('https://instalura-api-git-master-omariosouto.vercel.app/api/login', {
      method: 'POST',
      body: { username, password },
    });
  },
};
