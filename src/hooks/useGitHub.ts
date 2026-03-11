import { useState, useEffect } from "react";
import { PERSONAL } from "../lib/constants";

interface GitHubData {
  lastPush: string | null;
  publicRepos: number | null;
  loading: boolean;
}

export const useGitHub = (): GitHubData => {
  const [data, setData] = useState<GitHubData>({
    lastPush: null,
    publicRepos: null,
    loading: true,
  });

  useEffect(() => {
    fetch(`https://api.github.com/users/${PERSONAL.github}`)
      .then((r) => r.json())
      .then((json) => {
        setData({
          lastPush: json.updated_at ?? null,
          publicRepos: json.public_repos ?? null,
          loading: false,
        });
      })
      .catch(() => setData((d) => ({ ...d, loading: false })));
  }, []);

  return data;
};
