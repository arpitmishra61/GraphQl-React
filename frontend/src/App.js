import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Details from './components/Details'
import {ApolloClient} from 'apollo-boost'
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Launchers from './components/Launchers';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:8000/graphql'
});

const client = new ApolloClient({
  cache,
  link
});

function App() {

  return (
    <ApolloProvider client={client} >
      <Router >

    <div className="App "> 
    
      <Navbar />
      <Switch>
     <Route exact path="/"><Launchers /></Route> 
    <Route exact path="/details/:flight_number" component={Details} /> 
      </Switch>
     
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
