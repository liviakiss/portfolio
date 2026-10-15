import { HomeView } from "../components/HomeView";
import { getRecentCommits } from "../lib/github";

export default async function HomePage() {
  const commits = await getRecentCommits();
  return <HomeView commits={commits} />;
}
