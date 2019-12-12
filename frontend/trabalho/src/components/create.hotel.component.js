import React, { Component } from 'react';
import axios from 'axios';

export default class CreateHotel extends Component {
    constructor(props) {
      super(props);
      this.onChangeLogin = this.onChangeLogin.bind(this);
      this.onChangeSenha = this.onChangeSenha.bind(this);
      this.onChangeNomeHotel = this.onChangeNomeHotel.bind(this);
      this.onChangeCidade = this.onChangeCidade.bind(this);
      this.onChangeCnpj = this.onChangeCnpj.bind(this);
      this.onChangeSenhaHotel = this.onChangeSenhaHotel.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          login: '',
          senha: '',
          nome_hotel: '',
          cidade: '',
          cnpj: '',
          senha_hotel: ''
      }
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
  onChangeNomeHotel(e) {
    this.setState({
      nome_hotel: e.target.value
    })
  }
 onChangeCidade(e) {
    this.setState({
      cidade: e.target.value
    })
  }
 onChangeCnpj(e) {
    this.setState({
      cnpj: e.target.value
    })
  }
  onChangeSenhaHotel(e) {
    this.setState({
      senha_hotel: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
      const obj = {
          login: this.state.login,
          senha: this.state.senha,
          nome_hotel: this.state.nome_hotel,
          cidade: this.state.cidade,
          cnpj: this.state.cnpj,
          senha_hotel: this.state.senha_hotel
      };
      axios.post('http://localhost:5000/hoteis/', obj)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        window.alert(error.response.data.message);
      });
      this.setState({
      login: '',
      senha: '',
      nome_hotel: '',
      cidade: '',
      cnpj: '',
      senha_hotel: '',
    })
  }

  render() {
      return (
          <div style={{ marginTop: 10 }}>
              <h3>Cadastrar Novo Hotel</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Login (admin):  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.login}
                        onChange={this.onChangeLogin}
                        />
                  </div>
                  <div className="form-group">
                      <label>Senha (admin): </label>
                      <input type="password" 
                        className="form-control"
                        value={this.state.senha}
                        onChange={this.onChangeSenha}
                        />
                  </div>
                  <div className="form-group">
                      <label>Nome do hotel: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.nome_hotel}
                        onChange={this.onChangeNomeHotel}
                        />
                  </div>
                  <div className="form-group">
                      <label>Cidade: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.cidade}
                        onChange={this.onChangeCidade}
                      />
                  </div>
                  <div className="form-group">
                      <label>CNPJ: </label>
                      <input type="number"
                        className="form-control"
                        value={this.state.cnpj}
                        onChange={this.onChangeCnpj}
                        />
                  </div>
                  <div className="form-group">
                      <label>Senha (hotel): </label>
                      <input type="password" 
                        className="form-control"
                        value={this.state.senha_hotel}
                        onChange={this.onChangeSenhaHotel}
                        />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Salvar" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
      )
  }
}
