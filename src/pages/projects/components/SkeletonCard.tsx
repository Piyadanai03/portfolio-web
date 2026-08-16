const SkeletonCard = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
      <div className="aspect-video w-full animate-pulse bg-slate-200" />

      <div className="flex flex-grow flex-col p-6 gap-4">
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-slate-200" />

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;