import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>HomePage</h1>
      <p>
        Get started: <Link href="/parking">Here</Link>
      </p>
    </div>
  );
}
