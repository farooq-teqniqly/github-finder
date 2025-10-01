export const fetchGithubUser = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`
  );

  if (!res.ok) {
    throw new Error("User not found.");
  }

  return await res.json();
};
