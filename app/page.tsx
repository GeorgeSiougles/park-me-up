import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="ml-4 text-center">
      <h1 className="text-3xl">
        Welcome to my parking management application!
      </h1>
      <p className="mt-4 text-2xl">
        Get started
        <Button variant={"default"}>
          <Link className="p-2" href="/parking">
            Here
          </Link>
        </Button>
      </p>
    </div>
  );
}
