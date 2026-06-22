export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export async function getGithubRepos(username: string): Promise<GithubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
    {
      headers: { Accept: "application/vnd.github.mercy-preview+json" },
      next: { revalidate: 3600 }, // revalidate every hour
    }
  );
  if (!res.ok) return [];
  return res.json();
}
