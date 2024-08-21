
import { Switch, Route } from 'wouter'

import { HomePage } from './features/home' 

function App () { 
  return (
    <Switch>
      <Route path='/' component={HomePage}/>
    </Switch>
  )
}

export default App;