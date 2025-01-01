import React ,{useCallback , useState} from 'react';


import { BrowserRouter as Router , Routes, Route , Navigate  } from 'react-router-dom';
import User from './Users/pages/user';
import NewPlace from './Places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlace from './Places/pages/UserPlace';
import UpdatePlace from './Places/pages/UpdatePlace';
import Auth from './Users/pages/Auth.js';
import AuthContext from './shared/context/AuthContext';

function App() {

  const [isLoggedIn , setisLoggedIn] = useState(false)
  const [userId , setuserId] = useState()

  const login = useCallback((uid)=>{
    setisLoggedIn(true)
    setuserId(uid)
  },[])

  const logout = useCallback(()=>{
    setisLoggedIn(false)
    setuserId(null)
  },[])

  let routes;

  if(isLoggedIn){

    routes = ( 
      <>
        <Route path="/" element={<User />} />
        <Route path='/places/new' element = {<NewPlace/>} />
        <Route path='/places/:placesid' element = {<UpdatePlace/>}/>
        <Route path = "/:uid/places" element = {<UserPlace/>} />
        <Route path="*" element={<Navigate to="/" />} />
        
      </>
    )

  }else{
    routes = ( 
      <>
        <Route path="/" element={<User />} />
        <Route path = "/:uid/places" element = {<UserPlace/>} />
        <Route path = "/auth" element = {<Auth/>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </>
    )
  }

  return (
  <AuthContext.Provider value={{isLoggedIn: isLoggedIn , userId : userId , login: login , logout:logout }}>


  
  
  <Router>
      <MainNavigation/>
      <main>

    <Routes>
      {routes}

    </Routes>
      </main>
  </Router>
  </AuthContext.Provider>
  )
}

export default App;
