import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePromocao extends Component {
    constructor(props) {
      super(props);
      this.onChangeLogin = this.onChangeLogin.bind(this);
      this.onChangeSenha = this.onChangeSenha.bind(this);
      this.onChangeUrl = this.onChangeUrl.bind(this);
      this.onChangeDataInicio = this.onChangeDataInicio.bind(this);
      this.onChangeDataFim = this.onChangeDataFim.bind(this);
      this.onChangePreco = this.onChangePreco.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          login: '',
          senha: '',
          url: '',
          data_inicio: '',
          data_fim: '',
          preco: ''
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
  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    })
  }
  onChangeDataInicio(e) {
    this.setState({
      data_inicio: e.target.value
    })
  }
 onChangeDataFim(e) {
    this.setState({
      data_fim: e.target.value
    })
  }
  onChangePreco(e) {
    this.setState({
      preco: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
      const obj = {
          login: this.state.login,
          senha: this.state.senha,
          url: this.state.url,
          data_inicio: this.state.data_inicio,
          data_fim: this.state.data_fim,
          preco: this.state.preco
      };
      axios.post('http://localhost:5000/promocoes/', obj)
        .then(res => console.log(res.data));

      this.setState({
      login: '',
      senha: '',
      url: '',
      data_inicio: '',
      data_fim: '',
      preco: ''
    })
  }

  render() {
      return (
          <div style={{ marginTop: 10 }}>
              <h3>Adicionar Nova Promoção</h3>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Login (hotel): </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.login}
                        onChange={this.onChangeLogin}
                        />
                  </div>
                  <div className="form-group">
                      <label>Senha (hotel): </label>
                      <input type="password" 
                        className="form-control"
                        value={this.state.senha}
                        onChange={this.onChangeSenha}
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
                      <label>Data início: </label>
                      <input type="date" 
                        className="form-control"
                        value={this.state.data_inicio}
                        onChange={this.onChangeDataInicio}
                      />
                  </div>
                  <div className="form-group">
                      <label>Data fim: </label>
                      <input type="date" 
                        className="form-control"
                        value={this.state.data_fim}
                        onChange={this.onChangeDataFim}
                        />
                  </div>
                  <div className="form-group">
                      <label>Preço: </label>
                      <input type="float" 
                        className="form-control"
                        value={this.state.preco}
                        onChange={this.onChangePreco}
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
