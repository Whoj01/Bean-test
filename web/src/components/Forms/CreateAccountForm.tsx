
import { User, ChevronRightIcon, Lock, Loader2, AlertCircle } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useUserAPI } from "@/services/user"
import { Alert, AlertTitle, AlertDescription } from "../ui/alert"
import { useResponse } from "@/hooks/useResponse"
import { useCookies } from "@/hooks/useCookies"
import { useUserStore } from "@/store/user"
import { useNavigate } from "react-router-dom"

const schema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').max(25, 'O nome deve ter no máximo 25 caracteres'),
  password: z.string().min(3, 'A senha deve ter no mínimo 3 caracteres').max(25, 'Sua senha deve ter no máximo 25 caracteres'),
  confirmPassword: z.string().min(3, 'A senha deve ter no mínimo 3 caracteres').max(25, 'Sua senha deve ter no máximo 25 caracteres'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas devem ser iguais',
  path: ['confirmPassword'],
  params: { 'confirmPassword': true }
})

type FormProps = z.infer<typeof schema>

export const CreateAccountForm = () => {
  const navigate = useNavigate();
  const { actions: { addUser } } = useUserStore()
  const { setCookieToName } = useCookies()
  const { error, loading, setError, setLoading, setMessageToError, message } = useResponse()
  const { CreateUser } = useUserAPI()
  const { register, formState, handleSubmit } = useForm<FormProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  const handleCreateAccount = async (formData: FormProps) => {
    try {
      setError(false)
      setLoading(true)

      const { data } = await CreateUser(formData)

      setCookieToName('token', data.data.token)
      addUser(data.data.token)
      setLoading(false)
      navigate('/teams/create')
    } catch (error: any) {
      if (error?.response?.status === 406) {
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
    <>
      <form className="flex flex-col items-start justify-start w-full gap-2 max-h-[440px]" onSubmit={handleSubmit(handleCreateAccount)}>
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

        <Input
          {...register('confirmPassword')}
          Element={<Lock size={24} className='text-stone-500' />}
          label="Confirmar senha"
          placeholder='Confirme sua senha'
          type='password'
          error={!!formState.errors.confirmPassword}
          helperText={formState.errors.confirmPassword?.message}
        />

        <Button className='flex items-center mt-3 justify-center w-full self-center' type='submit'>
          {!loading && (
            <>
              <ChevronRightIcon size={16} /> Criar conta
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

    </>
  )
}