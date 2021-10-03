import { AuthenticatedApp } from 'authenticcated-app';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';
// import {ProjectListScreen} from 'screens/project-list';
// import { LoginScreen } from 'screens/login';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <LoginScreen /> */}
      {user? <AuthenticatedApp/>: <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
