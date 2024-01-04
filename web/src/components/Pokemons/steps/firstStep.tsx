import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface firstStepProps {
  nextStep: () => void
}

export const FirstStep = ({ nextStep }: firstStepProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="font-poppins font-bold text-3xl text-redpoke text-center">
        Vamos criar o seu time!
      </h1>

      <p className="font-inter font-medium text-xl text-center">
        Lembre-se de equilibrar o seu time para ter maior versatilidade nas batalhas.
      </p>

      <p className="font-inter font-medium text-xl text-center">
        Escolha 5 pokemons para seu time, nada mais e nada menos.
      </p>

      <div className="flex justify-center w-full gap-3">
        <Button className="max-w-44 bg-blue-400 hover:bg-blue-400 hover:brightness-75 transition-all flex-grow" asChild>
          <Link to="/teams">
            Voltar
          </Link>
        </Button>

        <Button className="max-w-44 bg-redpoke hover:bg-redpoke hover:brightness-75 transition-all flex-grow" onClick={nextStep}>
          Escolher Pokémons
        </Button>
      </div>

    </div>
  )
}