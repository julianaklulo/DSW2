import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class ListPromocaoCidade extends Component {

  constructor(props) {
      super(props);
      this.onChangeCidade = this.onChangeCidade.bind(this);
      this.onChangeDataInicio = this.onChangeDataInicio.bind(this);
      this.onChangeDataFim = this.onChangeDataFim.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
        cidade: '',
        data_inicio: '',
        data_fim: '',
        promocoes: []
      }
  }
  tabRow(){
      return this.state.promocoes.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }
  onChangeCidade(e) {
    this.setState({
      cidade: e.target.value
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
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      cidade: this.state.cidade,
      data_inicio: this.state.data_inicio,
      data_fim: this.state.data_fim
    };
      axios.post('http://localhost:5000/listar_promocoes_cidade/', obj)
      .then(response => {
        this.setState({ promocoes: response.data });
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        window.alert(error.response.data.message);
      });

    this.setState({
      cidade: '',
      data_inicio: '',
      data_fim: ''
    })
  }

    render() {
      return (
        <div sytle={{ marginTop: 10 }}>
          <h3 align="center">Promoções</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Cidade: </label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={this.state.cidade}
                  onChange={this.onChangeCidade}
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
