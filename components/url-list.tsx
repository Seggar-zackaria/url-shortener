"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CardSkeleton } from "./ui/skeleton";

import { UrlResponse, Url } from "@/lib/definitions";

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

  const shortenUrl = (shortCode: string) => {
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`;
  };

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
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="items-center mb-4 list-none">
            <CardSkeleton />
          </li>
        ))}
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (urls.length === 0)
    return (
      <div className="text-center text-3xl text-gray-500 mt-8">
        No URLS - insert an URL ^^
      </div>
    );
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
