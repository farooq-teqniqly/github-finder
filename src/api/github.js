export const fetchGithubUser = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`
  );

  if (!res.ok) {
    throw new Error("User not found.");
  }

  return await res.json();
};

export const searchGithubUser = async (query) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`
  );

  if (!res.ok) {
    throw new Error("User not found.");
  }

  const data = await res.json();

  return data.items;
};
