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

export const checkIfFollowingUser = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (res.status === 204) {
    return true;
  }

  if (res.status === 404) {
    return false;
  }

  const error = await res.json();
  throw new Error(error.message || "Failed to check follow status.");
};

export const followUser = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to follow user.");
  }

  return true;
};

export const unfollowUser = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to unfollow user.");
  }

  return true;
};
