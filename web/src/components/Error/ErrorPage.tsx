import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-start w-full h-full gap-1 max-w-[520px] px-3">
      <h1 className="text-3xl font-poppins font-bold text-title">Ops, aconteceu um erro ao carregar essa página</h1>
      <p className="font-nunitoSans text-redpoke text-lg">Parece que tivemos um problema... Tente voltar para a página anterior ou acessar a home.</p>

      <div className="flex items-center justify-start gap-3 self-start">
        <Button className="bg-redpoke hover:bg-redpoke hover:brightness-75 transition-all" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      </div>
    </div>
  )
}