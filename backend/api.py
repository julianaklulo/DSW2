from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Resource, Api, reqparse, abort

from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.exc import IntegrityError


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
DB_PARAM = "postgresql+psycopg2://{user}@{url}/{db}".format(user="julianaklulo", url="localhost:5432", db="dsw2")
app.config["SQLALCHEMY_DATABASE_URI"] = DB_PARAM
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSON_AS_ASCII"] = True
api = Api(app)
db = SQLAlchemy(app)


class Site(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(50), unique=True, nullable=False)
    nome_site = db.Column(db.String(80), nullable=False)
    telefone = db.Column(db.String(11), nullable=False)


class Hotel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cnpj = db.Column(db.String(50), unique=True, nullable=False)
    nome_hotel = db.Column(db.String(80), nullable=False)
    cidade = db.Column(db.String(50), nullable=False)


class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(50), nullable=False)
    senha = db.Column(db.String(100), nullable=False)

    id_site = db.Column(db.Integer, db.ForeignKey("site.id"), default=None)
    site = db.relationship("Site", backref=db.backref("usuarios", lazy=True))

    id_hotel = db.Column(db.Integer, db.ForeignKey("hotel.id"), default=None)
    hotel = db.relationship("Hotel", backref=db.backref("usuarios", lazy=True))

    is_admin = db.Column(db.Boolean, default=False)


class Promocao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    preco = db.Column(db.Float, nullable=False)
    data_inicio = db.Column(db.DateTime, nullable=False)
    data_fim = db.Column(db.DateTime, nullable=False)

    id_site = db.Column(db.Integer, db.ForeignKey("site.id"), nullable=False)
    site = db.relationship("Site", backref=db.backref("promocoes", lazy=True))

    id_hotel = db.Column(db.Integer, db.ForeignKey("hotel.id"), nullable=False)
    hotel = db.relationship("Hotel", backref=db.backref("promocoes", lazy=True))


@app.cli.command()
def resetdb():
    """Destroys and creates the database + tables"""

    from sqlalchemy_utils import database_exists, create_database, drop_database
    if database_exists(DB_PARAM):
        drop_database(DB_PARAM)
    if not database_exists(DB_PARAM):
        create_database(DB_PARAM)

    db.create_all()


class CriaSite(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("url", type=str)
    parser.add_argument("nome_site", type=str)
    parser.add_argument("telefone", type=str)
    parser.add_argument("senha_site", type=str)
    parser.add_argument("login", type=str)
    parser.add_argument("senha", type=str)

    def post(self):
        dados = self.parser.parse_args(strict=True)

        # autenticar como admin
        login = dados.get("login")
        senha = dados.get("senha")
        admin = Usuario.query.filter_by(login=login, senha=senha).first()

        if admin is None or not admin.is_admin:
            abort(401, message="Essa operação querer autenticação de administrador!")

        url = dados.get("url")
        nome_site = dados.get("nome_site")
        telefone = dados.get("telefone")
        senha_site = dados.get("senha_site")

        # cria site
        site = Site(url=url, nome_site=nome_site, telefone=telefone)
        db.session.add(site)
        try:
            db.session.commit()
        except IntegrityError as ex:
            abort(400, message=str(ex))

        # cria usuário para o site
        usuario = Usuario(login=site.url, senha=senha_site, id_site=site.id)
        db.session.add(usuario)
        try:
            db.session.commit()
        except IntegrityError as ex:
            abort(400, message=str(ex))

        response = {"id_site": site.id, "url": site.url, "nome_site": site.nome_site, "telefone": site.telefone}
        return jsonify(response)

    def get(self):
        # listar todos os sites
        sites = Site.query.all()
        response = []
        for site in sites:
            response.append({"id_site": site.id, "url": site.url, "nome_site": site.nome_site, "telefone": site.telefone})
        return jsonify(response)


class CriaHotel(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("cnpj", type=str)
    parser.add_argument("nome_hotel", type=str)
    parser.add_argument("cidade", type=str)
    parser.add_argument("senha_hotel", type=str)
    parser.add_argument("login", type=str)
    parser.add_argument("senha", type=str)

    def post(self):
        dados = self.parser.parse_args(strict=True)

        # autenticar como admin
        login = dados.get("login")
        senha = dados.get("senha")
        admin = Usuario.query.filter_by(login=login, senha=senha).first()

        if admin is None or not admin.is_admin:
            abort(401, message="Essa operação requer autenticação de administrador!")

        cnpj = dados.get("cnpj")
        nome_hotel = dados.get("nome_hotel")
        cidade = dados.get("cidade")
        senha_hotel = dados.get("senha_hotel")

        # cria hotel
        hotel = Hotel(cnpj=cnpj, nome_hotel=nome_hotel, cidade=cidade)
        db.session.add(hotel)
        try:
            db.session.commit()
        except IntegrityError as ex:
            abort(400, message=str(ex))

        # cria usuário para o hotel
        usuario = Usuario(login=hotel.cnpj, senha=senha_hotel, id_hotel=hotel.id)
        db.session.add(usuario)
        try:
            db.session.commit()
        except IntegrityError as ex:
            abort(400, message=str(ex))

        response = {"id_hotel": hotel.id, "cnpj": hotel.cnpj, "nome_hotel": hotel.nome_hotel, "cidade": hotel.cidade}
        return jsonify(response)

    def get(self):
        # listar todos os hotéis
        hoteis = Hotel.query.all()
        response = []
        for hotel in hoteis:
            response.append({"id_hotel": hotel.id, "cnpj": hotel.cnpj, "nome_hotel": hotel.nome_hotel, "cidade": hotel.cidade})
        return jsonify(response)


class CriaPromoção(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("url", type=str)
    parser.add_argument("data_inicio", type=str)
    parser.add_argument("data_fim", type=str)
    parser.add_argument("preco", type=float)
    parser.add_argument("login", type=str)
    parser.add_argument("senha", type=str)

    def post(self):
        dados = self.parser.parse_args(strict=True)

        # autenticar como hotel
        login = dados.get("login")
        senha = dados.get("senha")
        usuario_hotel = Usuario.query.filter_by(login=login, senha=senha).first()

        if usuario_hotel is None or usuario_hotel.id_hotel is None:
            abort(400, message="Essa operação requer autenticação de hotel!")
        hotel = Hotel.query.filter_by(id=usuario_hotel.id_hotel).first()

        url = dados.get("url")
        site = Site.query.filter_by(url=url).first()
        if site is None:
            abort(400, message="O site informado não existe!")

        data_inicio = dados.get("data_inicio")
        data_inicio = datetime.strptime(data_inicio, "%Y-%m-%d")
        data_fim = dados.get("data_fim")
        data_fim = datetime.strptime(data_fim, "%Y-%m-%d")
        preco = dados.get("preco")

        promoção = Promocao(preco=preco, data_inicio=data_inicio, data_fim=data_fim, id_hotel=hotel.id, id_site=site.id)

        # confere se há outra promoção na mesma data antes de salvar
        promoções_hotel = Promocao.query.filter_by(id_hotel=hotel.id).all()

        if promoções_hotel != []:
            for p in promoções_hotel:
                inicio = p.data_inicio
                fim = p.data_fim
                if inicio <= data_inicio <= fim or data_inicio <= inicio <= data_fim:
                    abort(400, message="Já há outra promoção cadastrada nesse período!")

        db.session.add(promoção)
        try:
            db.session.commit()
        except IntegrityError as ex:
            abort(400, message=str(ex))
        response = {"id_promocao": promoção.id, "nome_site": site.nome_site, "nome_hotel": hotel.nome_hotel, "preco": promoção.preco, "data_inicio": promoção.data_inicio, "data_fim": promoção.data_fim}
        return jsonify(response)


class ListaPromoçõesCidade(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("cidade", type=str)
    parser.add_argument("data_inicio", type=str)
    parser.add_argument("data_fim", type=str)

    def post(self):
        dados = self.parser.parse_args(strict=True)

        # filtrar por cidade
        cidade = dados.get("cidade")
        hoteis = Hotel.query.filter_by(cidade=cidade).all()
        if hoteis == []:
            abort(404, message="Não há hotéis cadastrados nessa cidade!")

        response = []
        for hotel in hoteis:
            promoções = Promocao.query.filter_by(id_hotel=hotel.id).all()
            # filtrar promoções pelo range de datas
            data_inicio = dados.get("data_inicio")
            data_inicio = datetime.strptime(data_inicio, "%Y-%m-%d")
            data_fim = dados.get("data_fim")
            data_fim = datetime.strptime(data_fim, "%Y-%m-%d")
            for promoção in promoções:
                if promoção.data_inicio <= data_inicio <= promoção.data_fim or data_inicio <= promoção.data_inicio <= data_fim:
                    site = Site.query.filter_by(id=promoção.id_site).first()
                    response.append({"id_promocao": promoção.id, "nome_site": site.nome_site, "nome_hotel": hotel.nome_hotel, "preco": promoção.preco, "data_inicio": promoção.data_inicio, "data_fim": promoção.data_fim})

        if response == []:
            abort(404, message="Não há promoções para essa cidade nestas datas!")
        return jsonify(response)


class ListaPromoçõesSite(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("login", type=str)
    parser.add_argument("senha", type=str)

    def post(self):
        dados = self.parser.parse_args(strict=True)

        # autenticar como site
        login = dados.get("login")
        senha = dados.get("senha")
        usuario_site = Usuario.query.filter_by(login=login, senha=senha).first()

        if usuario_site is None or usuario_site.id_site is None:
            abort(400, message="Essa operação requer autenticação de site!")

        site = Site.query.filter_by(id=usuario_site.id_site).first()

        promoções = Promocao.query.filter_by(id_site=usuario_site.id_site).all()
        if promoções == []:
            abort(404, message="Não há promoções cadastradas nesse site!")

        response = []
        for promoção in promoções:
            hotel = Hotel.query.filter_by(id=promoção.id_hotel).first()
            response.append({"id_promocao": promoção.id, "nome_site": site.nome_site, "nome_hotel": hotel.nome_hotel, "preco": promoção.preco, "data_inicio": promoção.data_inicio, "data_fim": promoção.data_fim})
        return jsonify(response)


class ListaPromoçõesHotel(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("login", type=str)
    parser.add_argument("senha", type=str)

    def post(self):
        dados = self.parser.parse_args(strict=True)

        # autenticar como hotel
        login = dados.get("login")
        senha = dados.get("senha")
        usuario_hotel = Usuario.query.filter_by(login=login, senha=senha).first()

        if usuario_hotel is None or usuario_hotel.id_hotel is None:
            abort(400, message="Essa operação requer autenticação de hotel!")

        hotel = Hotel.query.filter_by(id=usuario_hotel.id_hotel).first()

        promoções = Promocao.query.filter_by(id_hotel=usuario_hotel.id_hotel).all()
        if promoções == []:
            abort(404, message="Não há promoções cadastradas nesse hotel!")

        response = []
        for promoção in promoções:
            site = Site.query.filter_by(id=promoção.id_site).first()
            response.append({"id_promocao": promoção.id, "nome_site": site.nome_site, "nome_hotel": hotel.nome_hotel, "preco": promoção.preco, "data_inicio": promoção.data_inicio, "data_fim": promoção.data_fim})
        return jsonify(response)


api.add_resource(CriaSite, '/sites/')
api.add_resource(CriaHotel, '/hoteis/')
api.add_resource(CriaPromoção, '/promocoes/')
api.add_resource(ListaPromoçõesCidade, '/listar_promocoes_cidade/')
api.add_resource(ListaPromoçõesSite, '/listar_promocoes_site/')
api.add_resource(ListaPromoçõesHotel, '/listar_promocoes_hotel/')

if __name__ == '__main__':
    app.run(debug=True)
