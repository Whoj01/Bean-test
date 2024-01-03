import { zodResolver } from "@hookform/resolvers/zod"
import { User, ChevronRightIcon, Lock, AlertCircle, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Alert, AlertTitle, AlertDescription } from "../ui/alert"
import { useUserAPI } from "@/services/user"
import { useResponse } from "@/hooks/useResponse"
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/store/user"
import { useCookies } from "@/hooks/useCookies"

const schema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(25, 'O nome deve ter no máximo 255 caracteres'),
  password: z.string().min(3, 'A senha deve ter no mínimo 3 caracteres').max(25, 'Sua senha deve ter no máximo 25 caracteres'),
})

type FormProps = z.infer<typeof schema>

export const LoginForm = () => {
  const navigate = useNavigate();
  const { actions: { addUser } } = useUserStore()
  const { setCookieToName } = useCookies()
  const { error, loading, setError, setLoading, setMessageToError, message } = useResponse()
  const { LoginUser } = useUserAPI()

  const { register, formState, handleSubmit } = useForm<FormProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })

  const handleLoginUser = async (formData: FormProps) => {
    try {
      setError(false)
      setLoading(true)

      const { data } = await LoginUser(formData)

      setCookieToName('token', data.data.token)
      addUser(data.data.token)
      setLoading(false)
      navigate('/teams')
    } catch (error: any) {
      if (error?.response?.data?.status) {
        setMessageToError(error.response.data.msg)
        setError(true)
        setLoading(false)
        return
      }

      setMessageToError(error.message)
      setError(true)
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col items-start justify-start w-full gap-2" onSubmit={handleSubmit(handleLoginUser)}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            {message}
          </AlertDescription>
        </Alert>
      )}

      <Input
        {...register('name')}
        Element={<User size={24} className='text-stone-500' />}
        label="Nome do treinador"
        placeholder='Ensira seu nome de treinador'
        error={!!formState.errors.name}
        helperText={formState.errors.name?.message}
      />

      <Input
        {...register('password')}
        Element={<Lock size={24} className='text-stone-500' />}
        label="Senha"
        placeholder='Ensira sua senha'
        type='password'
        error={!!formState.errors.password}
        helperText={formState.errors.password?.message}
      />

      <Button className='flex items-center mt-3 justify-center w-full self-center' type='submit'>
        {!loading && (
          <>
            <ChevronRightIcon size={16} /> Entrar
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
  )
}