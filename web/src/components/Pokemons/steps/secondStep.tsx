import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Theme } from "@/helpers/pokemonsTheme"
import { usePokemonsAPI } from "@/services/pokemons"
import { SendHorizonal } from "lucide-react"
import { useEffect, useState } from "react"
import { Pokemon, PokemonCard } from "../PokemonCard"
import { useResponse } from "@/hooks/useResponse"
import { Button } from "@/components/ui/button"
import { SkeletonPokemonCard } from "../SkeletonPokemonCard"
import { ModalCreateTeam } from "../ModalCreateTeam"
import { Link } from "react-router-dom"



export const SecondStep = () => {
  const [types, setTypes] = useState<Array<{
    name: string
    textColor: string
  }>>([])
  const [selectedType, setSelectedType] = useState<string>('all')
  const [page, setPage] = useState<number>(1)
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([])
  const [createTeamModalIsOpen, setCreateTeamModalIsOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [pokemons, setPokemons] = useState<Array<{
    name: string
    url: string
  }> | []>([])

  const { loading, setLoading } = useResponse()
  const { getPokemons, getTypes, getPokemonsByType, getPokemonByName } = usePokemonsAPI()

  const getData = async () => {
    try {
      setLoading(true)
      const data: Array<{
        name: string
        url: string
      }> = await getPokemons(page)
      const typesName = await getTypes()

      setPokemons(data)
      setTypes(typesName.types)

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const getNewPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemons(page + 1)

      setPokemons(currentPokemons => [...currentPokemons, ...data]);
      setPage(page + 1)

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleSearch = async (value: string) => {
    if (selectedType === 'all') {
      const data = await getPokemonByName(value).catch(() => [])

      if (Array.isArray(data)) {
        setPokemons(data);
      } else {
        setPokemons([data]);
      }

      return
    }

    const tempData = pokemons.filter((pokemon) => pokemon.name.includes(value))

    setPokemons(tempData)

    if (value === '') {
      const data = await getPokemonsByType(selectedType)

      setPokemons(data)
    }
  }

  const handleCreateTeamModal = () => {
    setCreateTeamModalIsOpen(!createTeamModalIsOpen)
  }

  const handleChangeType = async (type: string) => {
    try {
      setLoading(true)
      setSelectedType(type)
      const data = await getPokemonsByType(type)

      setPokemons(data)
      setPage(1)

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const handleSelectPokemon = (pokemon: Pokemon) => {
    if (selectedPokemons.some((item) => item.id === pokemon.id)) {
      const tempSelectedPokemons = [...selectedPokemons]

      const filteredPokemons = tempSelectedPokemons.filter((item) => item.id !== pokemon.id)

      setSelectedPokemons(filteredPokemons)

      return
    }

    if (selectedPokemons.length >= 5) return

    if (selectedPokemons.length === 4) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0
      })
    }

    setSelectedPokemons((currentPokemons) => [...currentPokemons, pokemon])
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearch(search)
    }, 1500)

    return () => clearTimeout(delaySearch)
  }, [search])


  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-8 w-full h-full">
        <Button className="max-w-44 bg-blue-400 hover:bg-blue-400 hover:brightness-75 transition-all flex-grow" asChild>
          <Link to="/teams">
            Voltar
          </Link>
        </Button>
        <div className="flex items-center justify-start w-full gap-3">
          <Select defaultValue={selectedType} onValueChange={async (e) => await handleChangeType(e)}>
            <SelectTrigger className="max-w-full flex-grow">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all' className={`capitalize text-pokealltext`}>
                <div className="flex flex-row w-full items-center justify-betwee gap-3">
                  <img src='/icon-all.svg' alt="Icone de todos os pokemons" />

                  todos
                </div>
              </SelectItem>
              {types.map((type) => (
                <SelectItem value={type.name} className={`capitalize ${type.textColor ? type.textColor : 'text-red-200'} z-50`}>
                  <div className="flex flex-row w-full items-center justify-betwee gap-3">
                    <img src={Theme.Pokemons[type.name].Icon} alt={`Icone do tipo pokemon - ${type.name}`} />

                    {type.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            Element={<SendHorizonal size={16} />}
            onChange={(e) => setSearch(e.target.value)}
            divStyle="max-w-full flex-grow bg-white"
            placeholder="Procure pelo nome ou pelo código"
          />
        </div>

        {selectedPokemons.length > 0 && (
          <div className="flex flex-col w-full h-full gap-5">
            <div className="flex items-start justify-between w-full">
              <h1 className="font-poppins font-medium text-xl text-black-500">
                Pokemons selecionados <span className="text-redpoke">{selectedPokemons.length}/5</span>
              </h1>

              {selectedPokemons.length >= 5 && (
                <Button className="bg-blue-400 w-48 hover:bg-blue-400 hover:brightness-75 transition-all" onClick={handleCreateTeamModal}>
                  Criar time
                </Button>
              )}
            </div>

            <div className="flex flex-wrap w-full h-full gap-5">
              {selectedPokemons.map((pokemon) => <PokemonCard key={pokemon.id} handleSelectPokemon={handleSelectPokemon} pokemon={{
                name: pokemon.name,
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
              }} isPokemonsSelected={selectedPokemons.some(item => item.name === pokemon.name)} />)}
            </div>
          </div>
        )}

        <div className="flex flex-col w-full h-full gap-5">
          <h1 className="font-poppins font-medium text-xl text-black-500">
            Todos os pokemons
          </h1>

          <div className="flex flex-wrap w-full h-full gap-5">
            {pokemons.map((pokemon) => <PokemonCard key={pokemon.name} handleSelectPokemon={handleSelectPokemon} pokemon={pokemon} isPokemonsSelected={selectedPokemons.some(item => item.name === pokemon.name)} />)}

            {pokemons.length === 0 && !loading && (
              <div className="text-center  w-full font-poppins font-bold text-3xl">
                <h1>
                  Ops!
                </h1>
                <h2 className="font-poppins font-medium text-xl">Parece que não encontramos nenhum pokemon com essa descrição</h2>
              </div>
            )}

            {loading && new Array(12).fill(null).map((item) => <SkeletonPokemonCard key={item} />)}
          </div>
        </div>

        {(selectedType === 'all' && !loading && !search) && (
          <Button className="bg-blue-400 hover:bg-blue-400 hover:brightness-75 transition-all self-center" onClick={async () => await getNewPokemons()}>
            Ver mais pokemons!
          </Button>
        )}
      </div>

      {createTeamModalIsOpen && <ModalCreateTeam selectedPokemons={selectedPokemons} setModalCreateTeamIsOpen={handleCreateTeamModal} />}
    </>
  )
}