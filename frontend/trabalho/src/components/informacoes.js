import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Informacoes extends Component {

  render() {
    return (
      <div>
        <h2 align="center">Trabalho final da disciplina DSW2</h2>
        <p align="center">Desenvolvido por: Juliana Karoline de Sousa - RA 594997</p>
        <p><b>Requisitos atendidos:</b></p>
        <p>R1: Cadastro de sites de reservas (requer login de administrador)</p>
        <p>R2: Cadastro de hotéis (requer login de administrador)</p>
        <p>R3: Criação de uma promoção de um hotel (requer login do hotel via CNPJ +
            senha). Depois de fazer login, o hotel pode cadastrar uma promoção. Para isso,
            deve escolher um site de reservas (digitando seu endereço/URL ou
            escolhendo a partir de uma lista), uma data inicial/final e um preço, e deve
            ser gravada a promoção na base de dados.</p>
        <p>R4: Listagem de todas as promoções de um hotel (requer login do hotel via
            CNPJ + senha). Depois de fazer login, o hotel pode visualizar todas as suas
            promoções gravadas.</p>
        <p>R5: O sistema não deve permitir o cadastro de promoções de um hotel em um
            período que já contemple outra promoção daquele mesmo hotel,
            independente do site de reserva.</p>
        <p>R6: Listagem de todas as promoções de um site de reservas (requer login do
            site de reservas via endereço/URL + senha). Depois de fazer login, o site de
            reservas pode visualizar todas as suas promoções gravadas.</p>
        <p>R7: Listagem de todas as promoções de uma cidade (não requer login). O
            usuário escolhe a cidade e um período (data inicial/final), e o sistema mostra
            todas as promoções, de todos os hotéis, de todos os sites de reservas, para a
            cidade escolhida e cujo período da promoção tenha intersecção com o
            período escolhido pelo usuário.</p>
      </div>
    )
  }
}
