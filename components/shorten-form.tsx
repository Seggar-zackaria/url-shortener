"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ShortenFormProps {
  handleShorten: () => void;
}

export default function ShortenForm({ handleShorten }: ShortenFormProps) {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        console.log("url added with success");
      }
      await response.json();
      setUrl("");
      handleShorten();
    } catch (err) {
      console.error("error shorting url", err);
    } finally {
      console.log("url shortened");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="h-12"
          type="url"
          required
          placeholder="enter your url"
        />
        <Button className="w-full p-2 " type="submit" disabled={loading}>
          {loading ? "loading .. " : "shorten Link"}
        </Button>
      </div>
    </form>
  );
}
