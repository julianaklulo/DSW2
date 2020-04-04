# Desenvolvimento de Sotware para a Web 2
Trabalho desenvolvido na disciplina de Desenvolvimento de Software para Web 2, ministrada pelo prof. Dr. Daniel Lucredio da Universidade Federal de São Carlos.

## Descrição do projeto
O sistema possui um cadastro de sites de reservas de hotéis, com os seguinte dados: e-mail, senha, endereço/URL, nome e telefone.

O sistema possui um cadastro de hotéis, com os seguintes dados: e-mail, senha, CNPJ, nome e cidade.

O sistema possui um cadastro de promoções, com os seguintes dados: endereço/URL do site de reserva de hotéis, CNPJ do hotel, data inicial, data final e preço.

## Requisitos:
- R1: Cadastro de sites de reservas (requer login de administrador)
- R2: Cadastro de hotéis (requer login de administrador)
- R3: Criação de uma promoção de um hotel (requer login do hotel via CNPJ + senha). Depois de fazer - login, o hotel pode cadastrar uma promoção. Para isso, deve escolher um site de reservas (digitando seu endereço/URL ou escolhendo a partir de uma lista), uma data inicial/final e um preço, e deve ser gravada a promoção na base de dados.
- R4: Listagem de todas as promoções de um hotel (requer login do hotel via CNPJ + senha). Depois de fazer login, o hotel pode visualizar todas as suas promoções gravadas.
- R5: O sistema não deve permitir o cadastro de promoções de um hotel e período que já contemple outra promoção daquele mesmo hotel, independente do site de reserva.
- R6: Listagem de todas as promoções de um site de reservas (requer login do site de reservas via endereço/URL + senha). Depois de fazer login, o site de reservas pode visualizar todas as suas  promoções gravadas.
- R7: Listagem de todas as promoções de uma cidade (não requer login) usuário escolhe a cidade e um período (data inicial/final), e o sistema mostra todas as promoções, de todos os hotéis, de todos os sites de reservas, para a cidade escolhida e cujo período da promoção tenha intersecção com o período escolhido pelo usuário.

## Tecnologias utilizadas
Para o backend do projeto foi desenvolvida uma API REST usando Flask, que se conecta com um banco de dados PostgreSQL usando o SQLAlchemy. O frontend foi desenvolvido usando React e Bootstrap. 