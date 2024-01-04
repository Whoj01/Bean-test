import { TeamsContainer } from "@/components/Pokemons/TeamsContainer"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Divisor } from "@/components/ui/divisor"
import { useUserStore } from "@/store/user"
import { Link } from "react-router-dom"

export const Teams = () => {
  const { states: { user } } = useUserStore()

  return (
    <section className="flex flex-col gap-5 min-h-full w-screen px-3 py-5 max-w-[1237px]">
      <div className="flex items-start justify-start gap-3 max-w-screen">
        <Avatar>
          <AvatarImage src="./treinador.jpg" />
        </Avatar>

        <div className="flex flex-col w-full h-32 justify-between items-start">
          <div>
            <h1 className="font-poppins font-bold text-2xl capitalize text-blue-400">{user?.name}</h1>
            <p className="text-base  text-redpoke">Treinador(a) de Pokémons</p>
          </div>

          <Button className="bg-redpoke hover:bg-redpoke hover:brightness-90 transition-all" asChild>
            <Link to="/teams/create">Criar time</Link>
          </Button>
        </div>
      </div>

      <Divisor className="bg-blue-400 h-1 rounded-md" />

      <TeamsContainer />
    </section>
  )
}