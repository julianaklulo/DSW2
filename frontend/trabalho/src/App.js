import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreatePromocao from './components/create.promocao.component';
import CreateSite from './components/create.site.component';
import CreateHotel from './components/create.hotel.component';
import ListPromocaoSite from './components/list.promocao.site.component';
import ListPromocaoHotel from './components/list.promocao.hotel.component';
import ListPromocaoCidade from './components/list.promocao.cidade.component';

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
                  <Link to={'/sites'} className="nav-link">Cadastrar Site</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/hoteis'} className="nav-link">Cadastrar Hotel</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/promocoes'} className="nav-link">Adicionar Promoção</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/listar_promocoes_site'} className="nav-link">Listar Promoções por Site</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/listar_promocoes_hotel'} className="nav-link">Listar Promoções por Hotel</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/listar_promocoes_cidade'} className="nav-link">Listar Promoções por Cidade</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <Switch>
            <Route path='/sites' component={ CreateSite } />
            <Route path='/hoteis' component={ CreateHotel } />
            <Route path='/promocoes' component={ CreatePromocao } />
            <Route path='/listar_promocoes_site' component={ ListPromocaoSite } />
            <Route path='/listar_promocoes_hotel'component={ ListPromocaoHotel } />
            <Route path='/listar_promocoes_cidade'component={ ListPromocaoCidade } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
