import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-1 max-w-[520px] px-3">
      <h1 className="text-3xl font-poppins font-bold text-title">Ops, esta página não foi encontrada</h1>
      <p className="font-nunitoSans text-redpoke text-lg">Parece que você se perdeu... Tente voltar para a página anterior ou acessar a home.</p>

      <div className="flex items-center justify-start gap-3 self-start">
        <Button className="bg-redpoke hover:bg-redpoke hover:brightness-75 transition-all" onClick={() => navigate(-1)}>
          Voltar
        </Button>

        <Button className="bg-blue-400 hover:bg-blue-400 hover:brightness-75 transition-all" onClick={() => navigate('/teams')}>
          Ir para a home
        </Button>
      </div>
    </div>
  )
}