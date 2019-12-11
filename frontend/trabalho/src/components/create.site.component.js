import React, { Component } from 'react';
import axios from 'axios';

export default class CreateSite extends Component {
    constructor(props) {
      super(props);
      this.onChangeLogin = this.onChangeLogin.bind(this);
      this.onChangeSenha = this.onChangeSenha.bind(this);
      this.onChangeNomeSite = this.onChangeNomeSite.bind(this);
      this.onChangeTelefone = this.onChangeTelefone.bind(this);
      this.onChangeUrl = this.onChangeUrl.bind(this);
      this.onChangeSenhaSite = this.onChangeSenhaSite.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          login: '',
          senha: '',
          nome_site: '',
          telefone: '',
          url: '',
          senha_site: ''
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
  onChangeNomeSite(e) {
    this.setState({
      nome_site: e.target.value
    })
  }
 onChangeTelefone(e) {
    this.setState({
      telefone: e.target.value
    })
  }
 onChangeUrl(e) {
    this.setState({
      url: e.target.value
    })
  }
  onChangeSenhaSite(e) {
    this.setState({
      senha_site: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
      const obj = {
          login: this.state.login,
          senha: this.state.senha,
          nome_site: this.state.nome_site,
          telefone: this.state.telefone,
          url: this.state.url,
          senha_site: this.state.senha_site
      };
      axios.post('http://localhost:5000/sites/', obj)
        .then(res => console.log(res.data));

      this.setState({
      login: '',
      senha: '',
      nome_site: '',
      telefone: '',
      url: '',
      senha_site: '',
    })
  }

  render() {
      return (
          <div style={{ marginTop: 10 }}>
              <h3>Cadastrar Novo Site</h3>
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
                      <label>Nome do site: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.nome_site}
                        onChange={this.onChangeNomeSite}
                        />
                  </div>
                  <div className="form-group">
                      <label>Telefone: </label>
                      <input type="number" 
                        className="form-control"
                        value={this.state.telefone}
                        onChange={this.onChangeTelefone}
                      />
                  </div>
                  <div className="form-group">
                      <label>URL: </label>
                      <input type="text" 
                        className="form-control"
                        value={this.state.url}
                        onChange={this.onChangeUrl}
                        />
                  </div>
                  <div className="form-group">
                      <label>Senha (site): </label>
                      <input type="password" 
                        className="form-control"
                        value={this.state.senha_site}
                        onChange={this.onChangeSenhaSite}
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
