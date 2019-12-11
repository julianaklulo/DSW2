import React, { Component } from 'react';

class TableRow extends Component {
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id_promocao}
          </td>
          <td>
            {this.props.obj.nome_hotel}
          </td>
          <td>
            {this.props.obj.nome_site}
          </td>
          <td>
            {this.props.obj.data_inicio}
          </td>
          <td>
            {this.props.obj.data_fim}
          </td>
         <td>
            {this.props.obj.preco}
          </td>
        </tr>
    );
  }
}

export default TableRow;
