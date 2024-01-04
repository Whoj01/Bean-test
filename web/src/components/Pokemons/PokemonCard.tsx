import { Theme } from "@/helpers/pokemonsTheme"
import { Checkbox } from "../ui/checkbox"
import { useEffect, useState } from "react"
import { usePokemonsAPI } from "@/services/pokemons"
import { Skeleton } from "../ui/skeleton"
import { ModalPokemon } from "./ModalPokemon"

export interface Pokemon {
  name: string
  image: string
  type: string
  id: string
  bgColor: string
}

interface PokemonCardProps {
  pokemon: {
    name: string
    url: string
  }
  isPokemonsSelected: boolean
  handleSelectPokemon: (pokemon: Pokemon) => void
}

export const PokemonCard = ({ pokemon: { name, url }, handleSelectPokemon, isPokemonsSelected }: PokemonCardProps) => {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [modalPokemonIsOpen, setModalPokemonIsOpen] = useState<boolean>(false)
  const { getPokemon } = usePokemonsAPI()

  const toggleModalIsOpen = () => setModalPokemonIsOpen(!modalPokemonIsOpen)

  const getData = async () => {
    try {
      const pokemonData = await getPokemon(url)

      setPokemon(pokemonData)
    } catch (error) {
    }
  }

  const handleAddPokemon = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    handleSelectPokemon(pokemon! as Pokemon)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="z-0  relative flex bg-background flex-col items-start justify-between py-4 px-6 rounded-xl cursor-pointer shadow-md flex-grow h-[304px] hover:shadow-2xl hover:-translate-y-1 transition-all" onClick={() => setModalPokemonIsOpen(true)}>
        <div className="absolute top-4 right-4 z-30">
          <Checkbox className="z-40" onClick={handleAddPokemon} checked={isPokemonsSelected} />
        </div>

        <div className={`relative flex items-center justify-center m-auto w-[200px] h-[200px] rounded-full`} style={{
          backgroundColor: Theme.Pokemons[pokemon?.type as string]?.bg
        }}>
          {!pokemon?.image && (
            <Skeleton className="bg-slate-400 w-[200px] h-[200px] rounded-full self-center" />
          )}

          {pokemon?.image && <img src={pokemon?.image} alt={`Imagem do Pokemon ${name}`} className={`absolute w-5/6 h-full`} />}
        </div>

        <div className="flex flex-col items-start justify-start gap-2 w-full">
          {!pokemon?.id && <Skeleton className="w-8 h-3" />}

          {pokemon?.id && (
            <p className="font-inter font-medium text-slate-400 text-left">
              #{pokemon?.id}
            </p>
          )}

          { }
          <div className="flex items-center justify-between w-full">
            {!pokemon?.name && <Skeleton className="w-16 h-3" />}

            {pokemon?.name && (
              <p className="font-poppins font-semibold text-black-500">
                {name}
              </p>
            )}

            {!pokemon?.type && <Skeleton className="w-4 h-4" />}

            {pokemon?.type && (
              <img src={Theme.Pokemons[pokemon?.type as string]?.Icon} alt={`Icone do tipo ${pokemon?.type}`} className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>
      {modalPokemonIsOpen && <ModalPokemon
        pokemon={{
          name,
          type: pokemon?.type as string,
          principalImage: pokemon?.image as string
        }}
        handleSelectedPokemon={handleSelectPokemon}
        isPokemonsSelected={isPokemonsSelected}
        setModalPokemonIsOpen={toggleModalIsOpen}
      />
      }
    </>
  )
}