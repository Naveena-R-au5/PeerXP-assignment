import React,{useEffect,createContext,useReducer,useContext, useState} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Signup from './components/signup'
import Ticket from './components/ticket'
import Myarea from './components/myArea'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const [User,setUsers] = useState([])
  console.log("st",User)
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    setUsers(user)
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push('/')
    }
  },[])
  return(
    <Switch>
       <Route exact path="/">
        <Home />
      </Route>
      <Route  path="/login">
        <Login />
      </Route>
      <Route  path="/signup">
        <Signup />
      </Route>
      <Route  path="/createticket">
        <Ticket />
      </Route>
      <Route  path="/myArea">
        <Myarea />
      </Route>
   
   </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
     <BrowserRouter>
      <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
 }

export default App;
