
import { PlusSquareIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { LoginForm } from '@/components/Forms/LoginForm'
import { Divisor } from '@/components/ui/divisor'

export const LoginPage = () => {
  return (
    <section className="flex justify-center items-center w-screen bg-mainbg mt-8 px-3 ">
      <div className="flex flex-col items-center justify-center w-full rounded-md md:max-h-[600px] h-full overflow-clip md:flex-row md:max-w-[768px]">
        <div className="flex w-full h-auto bg-redpoke self-stretch">
          <div className="flex items-center justify-center relative w-full">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg" alt="Pikachu image" className="translate-y-2" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-start bg-background w-full h-2/3 py-6 gap-2 px-10">
          <h1 className="font-poppins font-bold text-red-500 text-xl text-center">
            Vamos caçar pokemons!
          </h1>

          <p className="font-inter font-medium text-black-500 text-center">
            Treinador, faça login para continuar!
          </p>

          <LoginForm />

          <div className='flex items-center w-full gap-3'>
            <Divisor className=' bg-zinc-800' />

            <p className='font-inter font-medium text-redpoke'>
              ou
            </p>

            <Divisor className=' bg-zinc-800' />
          </div>


          <Button className='flex items-center mt-3 justify-center w-full self-center gap-3 bg-blue-400 hover:bg-blue-400 hover:brightness-75 transition-all' asChild>
            <Link to='/register'>
              <PlusSquareIcon size={16} /> Criar conta
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}