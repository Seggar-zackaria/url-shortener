import Link from "next/link";
import { Button } from "./ui/button";
import { CopyIcon, EyeIcon } from "lucide-react";

export default function UrlList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Your URLs</h2>
      <ul className="space-y-2 border border-gray-200 rounded-md p-4">
        <li className="flex justify-between gap-4 items-center">
          <Link
            href="https://google.com"
            className="text-blue-500 hover:underline"
          >
            https://google.com
          </Link>
          <div className="flex items-center gap-3">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="p-2 text-muted-foreground hover:bg-muted"
            >
              <CopyIcon className="size-4" />
              <span className="sr-only">copy URL</span>
            </Button>
            <span className="flex items-center gap-2">
              <EyeIcon className="size-4" />
              <p>100 views</p>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
