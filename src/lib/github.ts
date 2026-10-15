/**
 * Latest commits of the My World repo, for the "Right now" block.
 *
 * - Reads the PUBLIC repo through GitHub's API, so no token is needed.
 *   (GITHUB_TOKEN is optional and only raises the rate limit.)
 * - The answer is cached for one hour. When you push, the GitHub webhook
 *   calls /api/revalidate and the cache is cleared straight away.
 * - If the newest commit is older than STALE_DAYS, or GitHub does not
 *   answer, this returns an empty list and the block simply does not show.
 * - Only the first line of each commit message and its date are used.
 */

export type Commit = {
  sha: string;
  /** First line of the commit message. */
  message: string;
  /** ISO date string. */
  date: string;
  url: string;
};

const REPO = "liviakiss/my-world";
const STALE_DAYS = 14;
const HOUR = 60 * 60;

type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { date: string } | null; committer: { date: string } | null };
};

export async function getRecentCommits(limit = 3): Promise<Commit[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const res = await fetch(`https://api.github.com/repos/${REPO}/commits?per_page=${limit}`, {
      headers,
      next: { revalidate: HOUR, tags: ["commits"] },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as GitHubCommit[];
    const commits = data
      .map((c) => ({
        sha: c.sha,
        message: (c.commit.message.split("\n")[0] ?? "").trim().slice(0, 90),
        date: c.commit.author?.date ?? c.commit.committer?.date ?? "",
        url: c.html_url,
      }))
      .filter((c) => c.message && c.date);

    if (commits.length === 0) return [];

    const ageDays = (Date.now() - new Date(commits[0].date).getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > STALE_DAYS) return [];

    return commits;
  } catch {
    return [];
  }
}
