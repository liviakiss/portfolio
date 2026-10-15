import Link from "next/link";
import { SiteFrame } from "../components/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame>
      <main id="main" className="lost">
        <div className="mono acc" style={{ marginBottom: 16 }}>
          [ 404 ]
        </div>
        <h1>This page is not on the shelf.</h1>
        <p className="mute" style={{ margin: "0 0 28px" }}>
          The link may be old, or mistyped.
        </p>
        <Link className="btn" href="/">
          Back to the shelf
        </Link>
      </main>
    </SiteFrame>
  );
}
