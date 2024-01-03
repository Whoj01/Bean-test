export const Header = () => {
  return (
    <header className="flex justify-between items-center py-5 max-w-[1237px] w-full h-24">
      <img src="/logo.svg" alt="Logo pokemon" className="w-44 h-16" />

      <img src='./pin-pokedex.png' alt="Pokedex" style={{ width: '64px', height: '64px' }} />
    </header>
  )
}