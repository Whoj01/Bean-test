import { Skeleton } from "../ui/skeleton"

export const SkeletonPokemonCard = () => {
  return (
    <Skeleton className="flex flex-col rounded-xl items-start justify-between py-4 px-6 w-72 h-[304px] bg-slate-300 flex-grow">
      <Skeleton className="bg-slate-400 w-[200px] h-[200px] rounded-full self-center" />

      <div className="flex flex-col items-start justify-start gap-2 w-full">
        <Skeleton className="w-8 h-3" />

        <div className="flex items-center justify-between w-full">
          <Skeleton className="w-16 h-3" />

          <Skeleton className="w-4 h-4" />
        </div>
      </div>
    </Skeleton>
  )
}