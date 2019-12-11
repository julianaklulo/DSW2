import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class ListPromocaoSite extends Component {

  constructor(props) {
      super(props);
      this.onChangeLogin = this.onChangeLogin.bind(this);
      this.onChangeSenha = this.onChangeSenha.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        login: '',
        senha: '',
        promocoes: []
      }
  }
  componentDidMount(){
    const obj = {
      login: this.state.login,
      senha: this.state.senha
    };
    axios.post('http://localhost:5000/listar_promocoes_site/', obj)
      .then(response => {
          this.setState({ promocoes: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.promocoes.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }
  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    })
  }
  onChangeSenha(e) {
    this.setState({
      senha: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      login: this.state.login,
      senha: this.state.senha
    };
      axios.post('http://localhost:5000/listar_promocoes_site/', obj)
      .then(response => {
        this.setState({ promocoes: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    render() {
      return (
        <div sytle={{ marginTop: 10 }}>
          <h3 align="center">Promoções</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Login (site): </label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={this.state.login}
                  onChange={this.onChangeLogin}
                  />
            </div>
            <div className="form-group">
              <label>Senha (site): </label>
              <input type="password" 
                className="form-control"
                value={this.state.senha}
                onChange={this.onChangeSenha}
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Listar" className="btn btn-primary"/>
            </div>
          </form>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Id da promoção</th>
                <th>Nome do hotel</th>
                <th>Nome do site</th>
                <th>Início da promoção</th>
                <th>Fim da promoção</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      )
    }
  }
