import { api } from "@/lib/axios"
import { usePokemonsAPI } from "./pokemons"

export const useTeamAPI = () => {
  const { getPokemon } = usePokemonsAPI()

  const getTeams = async () => {
    const { data } = await api.get("/team")

    const returnTeams: Array<{pokemons: any, name: string, id: string}> = []
    const pokemonInfo: any[] = []

    for (const team of data.data) {
      for (const pokemon of team.pokemons_id) {
        const pokemonData = await getPokemon('https://pokeapi.co/api/v2/pokemon/' + pokemon)

        pokemonInfo.push(pokemonData)
      }

      console.log(pokemonInfo)
      
      returnTeams.push({
        pokemons: [...pokemonInfo],
        name: team.name,
        id: team.id
      })

      pokemonInfo.length = 0
    }

    return returnTeams
  }

  return {
    getTeams
  }
}