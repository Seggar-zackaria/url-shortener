"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CardSkeleton } from "./ui/skeleton";

interface UrlResponse {
  urls: Url[];
  createdAt: string;
  id: string;
}

interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  visits: number;
}

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyUrl, setCopyUrl] = useState<string>("");

  const handleCopyUrl = (url: string) => {
    const fullUrl = `${shortenUrl(url)}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setCopyUrl(url);
      setTimeout(() => {
        setCopied(false);
        setCopyUrl("");
      }, 2000);
    });
  };

  const shortenUrl = (shortCode: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`;

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/urls");
      const data: UrlResponse = await response.json();
      setUrls(data.urls);
    } catch (err) {
      console.error("error fetching urls", err);
      setError(err instanceof Error ? err.message : "Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (loading)
    return (
      <div>
        {[1, 2, 3, 4, 5].map((ske) => (
          <li key={ske} className="items-center mb-4">
            <CardSkeleton />
          </li>
        ))}
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Your URLs</h2>
      <ul className="space-y-2  ">
        {urls.map((url) => (
          <li
            key={url.id}
            className="flex justify-between gap-4 items-center border-2 border-gray-200 rounded-md p-2"
          >
            <Link
              href={`${url.shortCode}`}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {shortenUrl(url.shortCode)}
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant={"ghost"}
                onClick={() => handleCopyUrl(url.shortCode)}
                size={"icon"}
                className="p-2 text-muted-foreground hover:bg-muted"
              >
                {copied && copyUrl == url.shortCode ? (
                  <Check className="size-4" />
                ) : (
                  <CopyIcon className="size-4" />
                )}

                <span className="sr-only">copy URL</span>
              </Button>

              <span className="flex items-center gap-2">
                <EyeIcon className="size-4" />

                <p className="text-sm text-neutral-500">
                  {url.visits || 0} views
                </p>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
