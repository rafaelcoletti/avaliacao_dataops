# Arquivo Python para criação de DataFrames carros e montadoras e inserção dos DataFrames no MongoDB

import os
import pandas as pd
from pymongo import MongoClient
from pymongo.errors import PyMongoError


def conectar_mongo(uri: str = None):
    uri = uri or os.getenv("MONGO_URI", "mongodb://localhost:27017/")
    return MongoClient(uri)


# ADICIONANDO DADOS PARA A CRIAÇÃO DO DATAFRAME
carros = {
    'Carro': ['Onix', 'Polo', 'Sandero', 'Fiesta', 'City'],
    'Cor': ['Prata', 'Branco', 'Prata', 'Vermelho', 'Preto'],
    'Montadora': ['Chevrolet', 'Volkswagen', 'Renault', 'Ford', 'Honda']
}

montadoras = {
    'Montadora': ['Chevrolet', 'Volkswagen', 'Renault', 'Ford', 'Honda'],
    'País': ['EUA', 'Alemanha', 'França', 'EUA', 'Japão']
}

# CRIAÇÃO DOS DATAFRAMES CARROS E MONTADORAS
df_carros = pd.DataFrame(carros)
df_montadoras = pd.DataFrame(montadoras)

# CONECTAR AO MONGODB E INSERIR DADOS
try:
    with conectar_mongo() as client:
        client.admin.command('ping')  # TESTA A CONEXÃO COM O MONGODB
        db = client["DATAOPS"]
        col_carros = db["carros"]
        col_montadoras = db["montadoras"]

        # EXCLUI OS DADOS PRÉ-EXISTENTES NAS COLLECTIONS PARA EVITAR QUE OS DADOS DUPLIQUEM NO CASO DE EXECUTAR O SCRIPT MAIS DE UMA VEZ
        col_carros.delete_many({})
        col_montadoras.delete_many({})

        # INSERE OS DADOS NAS RESPECTIVAS COLLECTIONS
        col_carros.insert_many(df_carros.to_dict("records"))
        col_montadoras.insert_many(df_montadoras.to_dict("records"))
        print("Dados inseridos com sucesso!")

# EXIBE A MENSAGEM NO TERMINAL EM CASO DE ERRO DE CONEXÃO COM O MONGODB OU DE INSERÇÃO DOS DADOS
except PyMongoError as err:
    print("Erro ao conectar ou inserir no MongoDB.")
    print(f"Detalhes: {err}")
