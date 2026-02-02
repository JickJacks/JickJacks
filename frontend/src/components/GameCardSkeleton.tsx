export default function GameCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-md border border-border-color bg-bg-surface shadow-sm">
      <div className="h-[200px] w-full skeleton" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded-full skeleton" />
        <div className="h-6 w-1/3 rounded-full skeleton" />
        <div className="h-4 w-1/2 rounded-full skeleton" />
      </div>
    </div>
  );
}
