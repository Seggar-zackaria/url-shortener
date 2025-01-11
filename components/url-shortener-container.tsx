"use client";

import ShortenForm from "./shorten-form";
import { CardSkeleton } from "./ui/skeleton";
import UrlList from "./url-list";
import { useState } from "react";
import { Suspense } from "react";
export default function UrlShortenerContainer() {
  const [refresh, setRefresh] = useState(0);

  const handleShorten = () => {
    setRefresh((prev) => prev + 1);
  };
  return (
    <div>
      <ShortenForm handleShorten={handleShorten} />
      <Suspense fallback={<CardSkeleton />}>
        <UrlList key={refresh} />
      </Suspense>
    </div>
  );
}
