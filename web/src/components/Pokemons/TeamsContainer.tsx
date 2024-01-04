import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useTeamAPI } from "@/services/team"
import { useEffect, useState } from "react"
import { useResponse } from "@/hooks/useResponse"
import { Skeleton } from "../ui/skeleton"
import { Pokemon } from "./PokemonCard"
import { TeamCard } from "./TeamCard"

export interface Team {
  id: string
  name: string
  pokemons: Pokemon[]
}

export const TeamsContainer = () => {
  const [teams, setTeams] = useState<Team[]>([])
  const { loading, setError, setLoading } = useResponse()
  const { getTeams } = useTeamAPI()

  async function handleGetTeams() {
    try {
      setLoading(true)

      const data = await getTeams()

      setTeams(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    handleGetTeams()
  }, [])

  return (
    <section data-teams={teams?.length > 0} className="flex flex-wrap justify-start items-center gap-3 max-w-screen h-full data-[teams=false]:justify-center">
      {teams?.length > 0 && teams.map(team => <TeamCard key={team.id} {...team} />)}

      {loading && (
        <>
          <Skeleton className="w-[320px] h-[224px] bg-slate-300 flex-grow" />
          <Skeleton className="w-[320px] h-[224px] bg-slate-300 flex-grow" />
          <Skeleton className="w-[320px] h-[224px] bg-slate-300 flex-grow" />
          <Skeleton className="w-[320px] h-[224px] bg-slate-300 flex-grow" />
          <Skeleton className="w-[320px] h-[224px] bg-slate-300 flex-grow" />
        </>
      )}

      {!loading && teams?.length === 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="font-poppins font-medium text-xl">Parece que você não possui nenhum time</h2>

          <Button className="bg-redpoke hover:bg-redpoke hover:brightness-90 transition-all" asChild>
            <Link to="/teams/create">Vamos criar?</Link>
          </Button>
        </div>
      )}
    </section>
  )
}