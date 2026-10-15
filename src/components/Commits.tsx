import type { Commit } from "../lib/github";
import { formatDay } from "../lib/format";

/**
 * The little list of latest commits. Shows nothing if there are none
 * (GitHub unreachable, or the newest commit is too old).
 */
export function Commits({ commits, onCard = false }: { commits: Commit[]; onCard?: boolean }) {
  if (commits.length === 0) return null;
  return (
    <>
      <div className={onCard ? "commits on-card" : "commits"}>
        {commits.map((c) => (
          <div className="commit" key={c.sha}>
            <span className="mono when">{formatDay(c.date)}</span>
            <span className="msg">{c.message}</span>
          </div>
        ))}
      </div>
      <p className="mono commits-note">Latest commits from GitHub · updated when I push</p>
    </>
  );
}
