import { Theme } from "@/helpers/pokemonsTheme"
import { usePokemonsAPI } from "@/services/pokemons"
import { ArrowBigRight, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"
import { Pokemon } from "./PokemonCard"

interface ModalPokemonProps {
  pokemon: {
    name: string
    type: string
    principalImage: string
  }
  setModalPokemonIsOpen: () => void
  handleSelectedPokemon: (pokemon: Pokemon) => void;
  isPokemonsSelected: boolean;
}

export interface EvolutionInfo {
  name: string;
  image: string;
}

export interface PokemonInfo {
  evolutionInfo: EvolutionInfo[];
  image: string;
  name: string;
  id: string;
  stats: Array<{
    name: string;
    value: number;
  }>;
  types: string[];
}

export const ModalPokemon = ({ pokemon: { name, type, principalImage }, setModalPokemonIsOpen, handleSelectedPokemon, isPokemonsSelected }: ModalPokemonProps) => {
  const { getPokemonInfo } = usePokemonsAPI()
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>()

  const getData = async () => {
    try {
      const data = await getPokemonInfo(name)

      setPokemonInfo(data)
    } catch (error) {
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex  items-center justify-center z-40 px-3">
      <div className="relative flex flex-col md:flex-row max-w-[640px]  w-full h-[540px] md:h-[450px] bg-background rounded-md overflow-clip">
        <X className="absolute top-4 right-4 z-20 cursor-pointer hover:brightness-75 hover:-translate-y-[1px] transition-all" onClick={() => setModalPokemonIsOpen()} />

        <div className={`flex items-center justify-center w-full h-1/3 md:w-3/6 md:h-full`} style={{
          backgroundColor: Theme.Pokemons[type as string]?.bg
        }}>
          <img src={principalImage} alt={`Imagem do Pokemon ${name}`} className="w-full h-full md:translate-x-2" />
        </div>

        <div className="flex flex-col items-start justify-between py-3 px-3 max-w-[640px] w-full h-full gap-3">
          <div className="flex flex-col items-start justify-start gap-3">
            <p className="font-poppins font-bold text-black-500">
              {name}
            </p>

            <div className="flex items-start justify-start gap-3">
              {!pokemonInfo?.types && (
                <>
                  <Skeleton className="w-16 h-5 bg-slate-400 rounded-md" />
                  <Skeleton className="w-16 h-5 bg-slate-400 rounded-md" />
                </>
              )}
              {pokemonInfo?.types.map((type) => (
                <div className={`flex items-center justify-center gap-2 bg-white rounded-md px-2 py-1.5 text-sm font-semibold text-black-500`} style={{
                  backgroundColor: Theme.Pokemons[type]?.bg,
                  color: Theme.Pokemons[type]?.text
                }}>
                  <img src={Theme.Pokemons[type]?.Icon} alt={`Icone do tipo pokemon - ${type}`} />

                  {type}
                </div>
              ))
              }
            </div>

            <div className="flex flex-wrap items-start justify-between gap-3 w-full h-full">
              {!pokemonInfo?.stats && Array(6).fill(null).map(() =>
                <div className="flex flex-col items-start justify-start gap-1">
                  <Skeleton className="w-14 h-6" />

                  <div className="w-24 flex items-center justify-start gap-2">
                    <Skeleton className="w-24 h-6" />

                    <Skeleton className="w-24 h-6" />
                  </div>
                </div>
              )}
              {pokemonInfo?.stats.map((stat) => (
                <div className="flex flex-col items-start justify-start gap-1">
                  <p className="font-inter font-normal text-sm text-black-500">
                    {stat.name}
                  </p>


                  <div className="w-24 flex items-center justify-start gap-2">
                    <p>
                      {stat.value}
                    </p>
                    /
                    <p>
                      255
                    </p>
                  </div>
                </div>
              ))
              }
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-3 w-full">
            <div className="flex items-start justify-between gap-3 w-full">
              {!pokemonInfo?.evolutionInfo && Array(3).fill(null).map(() => (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Skeleton className="w-16 h-8 md:w-32 md:h-16" />

                  <Skeleton className="w-14 h-8 md:w-32 md:h-16" />
                </div>

              ))}

              {
                pokemonInfo?.evolutionInfo.map((evolution, i) => (
                  <>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <img src={evolution.image} alt={`Imagem do Pokemon ${evolution.name}`} className="w-8 h-8 md:w-16 md:h-16" />

                      <p className="font-inter font-normal text-sm text-black-500">
                        {evolution.name}
                      </p>
                    </div>
                    {pokemonInfo.evolutionInfo.length - 1 !== i && (
                      <ArrowBigRight size={24} className="self-center min-w-6" style={{
                        color: Theme.Pokemons[pokemonInfo.types[0]]?.text
                      }} />
                    )}
                  </>
                ))
              }
            </div>

            <Button className="self-end bg-blue-400 hover:bg-blue-400 hover:brightness-75 cursor-pointer transition-all" onClick={() => {
              handleSelectedPokemon({
                bgColor: Theme.Pokemons[type satisfies string].bg!,
                id: pokemonInfo?.id!,
                image: principalImage,
                name,
                type: pokemonInfo?.types[0] as string
              })
              setModalPokemonIsOpen()
            }}>
              {isPokemonsSelected && 'Remover'}

              {!isPokemonsSelected && 'Selecionar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}