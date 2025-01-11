import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

function CardSkeleton() {
  return (
    <div className="flex w-full justify-between gap-4  items-center border-2 border-gray-200 rounded-md p-2">
      <Skeleton className="h-6 w-1/2 "></Skeleton>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-7 rounded-md"></Skeleton>
        <Skeleton className="size-6 rounded-full"></Skeleton>

        <Skeleton className="h-6 w-10 "></Skeleton>
      </div>
    </div>
  );
}

export { Skeleton, CardSkeleton };
