import './App.css';
import Material from './Register'
import Login from './Login'
import Table from './Table'
import Update from './Update'
import Add from './Add'
import For from './For'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <Table/> */}
      <Router>
        <Switch>
          <Route exact path ='/' component={Login}/>
          <Route  exact path ='/l' component={Material}/>
          <Route exact path='/table' component={Table}/>
          <Route exact path='/add/:id' component={Update}/>
          <Route exact path='/add' component={Add}/>
         <Route exact path='/For' component={For}/>


        </Switch>

      </Router>
    </div>
  );
}

export default App;
