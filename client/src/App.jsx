
import { Switch, Route } from 'wouter'
import { HomePage } from './features/home'  
import { AuthPage } from './features/auth'

function App () { 
  return (
    <Switch>
      <Route path='/' component={HomePage}/>
      <Route path='/auth/*' component={AuthPage}/>
    </Switch>
  )
}

export default App;