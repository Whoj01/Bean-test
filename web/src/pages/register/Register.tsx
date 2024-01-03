import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { CreateAccountForm } from '@/components/Forms/CreateAccountForm'
import { Divisor } from '@/components/ui/divisor'

export const RegisterPage = () => {
  return (
    <section className="flex justify-center items-center w-screen bg-mainbg mt-8 px-3 ">
      <div className="flex flex-col items-center justify-center w-full overflow-clip rounded-md md:max-h-[600px] h-full md:flex-row md:max-w-[768px] md:rounded-lg">
        <div className="flex w-full h-auto bg-blue-400 self-stretch">
          <div className="flex items-center justify-center relative w-full">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg" alt="Squirtle image" className="translate-y-2" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-start bg-background w-full h-2/3 py-6 gap-2 px-10">
          <h1 className="font-poppins font-bold text-blue-400 text-xl text-center">
            Vamos começar a caçar?
          </h1>

          <p className="font-inter font-medium text-black-500 text-center">
            Para se tornar um treinador, crie sua conta!
          </p>

          <CreateAccountForm />

          <Divisor className='bg-blue-400' />

          <Button className='flex items-center justify-center w-full self-center gap-3 bg-blue-400 hover:bg-blue-400 hover:brightness-75 transition-all' asChild>
            <Link to='/login'>
              <ChevronLeft size={16} /> Voltar
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}