import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import User from './Users/pages/user';
import NewPlace from './Places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlace from './Places/pages/UserPlace';
import UpdatePlace from './Places/pages/UpdatePlace';
import Auth from './Users/pages/Auth';

function App() {
  return (<Router>
      <MainNavigation/>
      <main>

    <Routes>
      <Route path="/" element={<User />} />
      <Route path='/places/new' element = {<NewPlace/>} />
      <Route path='/places/:placesid' element = {<UpdatePlace/>}/>
      <Route path = "/:uid/places" element = {<UserPlace/>} />
      <Route path = "/auth" element = {<Auth/>} />

    </Routes>
      </main>
  </Router>)
}

export default App;
