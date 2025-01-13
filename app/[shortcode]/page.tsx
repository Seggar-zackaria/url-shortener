"use server";

import prisma from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { Url } from "@/lib/definitions";

export default async function Page({
  params,
}: {
  params: Promise<{ shortcode: string }>;
}) {
  const { shortcode } = await params;

  const url: Url | null = await prisma.url.findUnique({
    where: { shortCode: shortcode },
  });

  if (!url) {
    return notFound();
  }

  await prisma.url.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  return redirect(url.originalUrl);
}
