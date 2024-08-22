
import { useUserStore } from "../../store"
import { WelcomePage } from "../welcome";


export function HomePage() {
  const [isLoggedIn, login] = useUserStore(s => [s.isLoggedIn, s.login]);

  return !isLoggedIn ? <WelcomePage/> : (
    <div className='page'>
      <h1 className='text-2xl'> Home Page </h1>
    </div>
  )
}