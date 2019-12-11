import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreatePromocao from './components/create.promocao.component';
import CreateSite from './components/create.site.component';
import CreateHotel from './components/create.hotel.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Promoção de Hotéis</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
               <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
               <li className="nav-item">
                  <Link to={'/sites'} className="nav-link">Cadastrar Site</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/hoteis'} className="nav-link">Cadastrar Hotel</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/promocoes'} className="nav-link">Adicionar Promoção</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <Switch>
            <Route path='/sites' component={ CreateSite } />
            <Route path='/hoteis' component={ CreateHotel } />
            <Route path='/promocoes' component={ CreatePromocao } />
            <Route path='/edit' componenent={ Edit } />
            <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
