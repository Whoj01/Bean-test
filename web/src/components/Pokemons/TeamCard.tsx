import { Theme } from "@/helpers/pokemonsTheme";
import { Team } from "./TeamsContainer";

export const TeamCard = ({ name, pokemons }: Team) => {
  return (
    <div className="flex flex-col flex-grow items-center justify-center px-3 py-3 max-w-[396px] max-h-[320px] gap-3 bg-background shadow-md rounded-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
      <h3 className="font-poppins font-medium text-xl text-redpoke capitalize">
        {name}
      </h3>

      <div className="flex flex-wrap gap-3 items-center justify-between">
        {pokemons.map(pokemon => (
          <div className="flex w-20 h-full rounded-full" style={{
            backgroundColor: Theme.Pokemons[pokemon.type]?.bg
          }}>
            <img className="w-20 h-20 overflow-auto" src={pokemon.image} />
          </div>
        ))}
      </div>
    </div>
  )
}