import { api } from "@/lib/axios"
import axios, { CancelTokenSource } from "axios";
import { get } from "http"

export const usePokemonsAPI = () => {
  let cancelToken: CancelTokenSource;

  const getPokemons = async (page: number) => {
    const getFrom = page === 1 ? 0 : page * 12

    const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon?offset=${getFrom}&limit=12`)

    return data.results.map((pokemon: any) => {
      return {
        name: pokemon.name,
        url: pokemon.url
      }
    }) 
  }

  const getPokemon = async (url: string) => {
    const { data } = await api.get(url)
    
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other.dream_world.front_default ?? data.sprites.front_default ?? null,
      type: data.types[0].type.name,
      bgColor: `bg-${data.types[0].type.name}-bg`,
    }
  }

  const getPokemonByName = async (parameter: string) => {
    if(cancelToken) cancelToken.cancel()

    cancelToken = axios.CancelToken.source()


    if(!parameter) return getPokemons(1)
    const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon/${parameter}`, { 
      cancelToken: cancelToken.token 
    })
    
    return {
      name: data.name,
      url: 'https://pokeapi.co/api/v2/pokemon/' + data.name,
    }
  }

  const getPokemonInfo = async (name: string) => {
    const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

    const { data: { evolution_chain: { url } } } = await api.get(data.species.url)

    const evolutionsData = await api.get(url)

    const evolutions: string[] = []

    const getEvolution = (evolution: any) => {
      evolutions.push(evolution.species.name)

      if (evolution.evolves_to.length > 0) {
        getEvolution(evolution.evolves_to[0])
      }
    }

    getEvolution(evolutionsData.data.chain)

    const evolutionInfo: Array<{
      name: string
      image: string
    }> = []

    for (const pokeName of evolutions) {
      if (name !== pokeName) {
        const { data } = await api.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)

        const sprite = data.sprites.other.dream_world.front_default ?? data.sprites.front_default

        evolutionInfo.push({
          name: pokeName,
          image: sprite
        })
      }
      if (name === pokeName) {
        evolutionInfo.push({
          name: name,
          image: data.sprites.other.dream_world.front_default ?? data.sprites.front_default
        })
      }  
    }
  
    return {
      name: data.name,
      id: data.id,
      image: data.sprites.other.dream_world.front_default ?? data.sprites.front_default,
      types: data.types.map((type: any) => type.type.name),
      stats: data.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat
      })),
      evolutionInfo
    }
  }

  const getTypes = async () => {
    const { data } = await api.get('https://pokeapi.co/api/v2/type')

    return {
      types: data.results.map((type: any) => {
        return {
          name: type.name,
          textColor: `text-${type.name}-text`
        }
      }).filter((type: any) => type.name !== 'unknown' && type.name !== 'shadow'),
    }
  }

  const getPokemonsByType = async (type: string) => {
    if (type === 'all') return getPokemons(1)

    const { data } = await api.get(`https://pokeapi.co/api/v2/type/${type}`)

    return data.pokemon.map((pokemon: any) => {
      return {
        name: pokemon.pokemon.name,
        url: pokemon.pokemon.url
      }
    })
  }

  const createTeam = async (name: string, pokemons_id: string[]) => {
    const { data } = await api.post('/team', {
      name,
      pokemons_id
    })

    return data
  }

  return {
    getPokemons,
    getPokemon,
    getPokemonInfo,
    getTypes,
    getPokemonsByType,
    getPokemonByName,
    createTeam
  }
}