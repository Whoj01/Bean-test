import { FirstStep } from "@/components/Pokemons/steps/firstStep"
import { SecondStep } from "@/components/Pokemons/steps/secondStep"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Theme } from "@/helpers/pokemonsTheme"
import { usePokemonsAPI } from "@/services/pokemons"
import { SendHorizonal } from "lucide-react"
import { useEffect, useState } from "react"

export const CreateTeam = () => {
  const [step, setStep] = useState(1)

  const nextStep = () => setStep((step) => step + 1)


  return (
    <section className="flex items-center justify-center max-w-[1237px] w-full min-h-fit h-full px-3 pb-12">
      {step === 1 && <FirstStep nextStep={nextStep} />}
      {step === 2 && <SecondStep />}
    </section>
  )
}