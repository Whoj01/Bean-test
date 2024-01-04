import { Loader2, X } from "lucide-react"
import { Pokemon } from "./PokemonCard"
import { Theme } from "@/helpers/pokemonsTheme"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { usePokemonsAPI } from "@/services/pokemons"
import { useResponse } from "@/hooks/useResponse"
import { useNavigate } from "react-router-dom"


interface ModalCreateTeamProps {
  setModalCreateTeamIsOpen: () => void
  selectedPokemons: Pokemon[]
}

const schema = z.object({
  name: z.string().min(3, 'O nome do time deve ter no mínimo 3 caracteres').max(20, 'O nome do time deve ter no máximo 20 caracteres')
})

type FormProps = z.infer<typeof schema>

export const ModalCreateTeam = ({ selectedPokemons, setModalCreateTeamIsOpen }: ModalCreateTeamProps) => {
  const navigate = useNavigate()
  const { createTeam } = usePokemonsAPI()
  const { loading, setLoading } = useResponse()
  const { register, formState: { errors }, handleSubmit } = useForm<FormProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })

  const handleCreateTeam = async (data: FormProps) => {
    try {
      setLoading(true)

      await createTeam(data.name, selectedPokemons.map(pokemon => pokemon.id))

      setLoading(false)
      navigate('/teams')
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-40 px-3">
      <div className="relative flex flex-col items-center justify-start gap-5 py-3 px-4 max-w-[640px] w-full h-[540px] md:h-[450px] bg-background rounded-md overflow-clip">
        <X className="absolute top-4 right-4 z-20 cursor-pointer hover:brightness-75 hover:-translate-y-[1px] transition-all" onClick={setModalCreateTeamIsOpen} />

        <h1 className="font-inter font-medium text-lg text-redpoke">
          Criar Time
        </h1>

        <div className="flex flex-col flex-wrap w-full justify-between gap-3">
          <p className="font-inter font-normal text-blue-300 text-lg">
            Pokemons selecionados
          </p>
          <div className="flex flex-wrap w-full justify-between">
            {selectedPokemons.map((pokemon) => (
              <div className="flex flex-col items-center justify-center gap-3 w-18 md:w-1/5">
                <div className="relative flex items-center justify-center md:1/2 md:h-1/2 rounded-full" style={{
                  backgroundColor: Theme.Pokemons[pokemon.type as string]?.bg
                }}>
                  <img src={pokemon.image} alt={`Imagem do Pokemon ${pokemon.name}`} className="h-14 w-14" />
                </div>

                <p className="font-inter font-medium text-sm text-black-500">
                  {pokemon.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-poppins font-bold text-xl text-center text-redpoke">
          Agora vamos dar um nome para o seu time
        </h2>

        <form className="flex flex-col w-full space-y-3">
          <Input
            {...register('name')}
            placeholder="Nome do seu time" label="Nome do time"
            error={!!errors.name?.message}
            helperText={errors.name?.message?.toString()}
          />

          <Button className="bg-blue-400 hover:bg-blue-400 hover:brightness-75 transition-all w-1/2 self-center" onClick={handleSubmit(handleCreateTeam)}>
            {!loading && (
              <>
                Criar time
              </>
            )}

            {loading && (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Por favor, aguarde...
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}