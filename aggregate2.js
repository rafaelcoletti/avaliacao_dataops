// ARQUIVO EXPORTADO DIRETAMENTE DO MONGODB SEM A SINTAXE .js, EXIBINDO '_id'(NOME DO PAÍS), 'Carros'(ARRAY COM OS DADOS DE CADA CARRO) E 'CarrosElements'(MOSTRANDO A CONTAGEM DE ELEMENTOS POR PAÍS)

[
    {
        '$lookup': {
            'from': 'montadoras',
            'localField': 'Montadora',
            'foreignField': 'Montadora',
            'as': 'montadora'
        }
    }, {
        '$unwind': {
            'path': '$montadora'
        }
    }, {
        '$project': {
            '_id': 1,
            'Carro': 1,
            'Cor': 1,
            'Montadora': 1,
            'País': '$montadora.País'
        }
    }, {
        '$group': {
            '_id': '$País',
            'Carros': {
                '$push': {
                    '_id': '$_id',
                    'Carro': '$Carro',
                    'Cor': '$Cor',
                    'Montadora': '$Montadora'
                }
            }
        }
    }, {
        '$addFields': {
            'CarrosElements': {
                '$concat': [
                    '[ ', {
                        '$toString': {
                            '$size': '$Carros'
                        }
                    }, ' elements ]'
                ]
            }
        }
    }, {
        '$project': {
            '_id': 1,
            'Carros': 1,
            'CarrosElements': 1
        }
    }
]

// MESMO ARQUIVO COM SINTAXE .js (EXPORTADA DIRETAMENTE PELO MONGODB)

const agg = [
    {
        '$lookup': {
            'from': 'montadoras',
            'localField': 'Montadora',
            'foreignField': 'Montadora',
            'as': 'montadora'
        }
    }, {
        '$unwind': {
            'path': '$montadora'
        }
    }, {
        '$project': {
            '_id': 1,
            'Carro': 1,
            'Cor': 1,
            'Montadora': 1,
            'País': '$montadora.País'
        }
    }, {
        '$group': {
            '_id': '$País',
            'Carros': {
                '$push': {
                    '_id': '$_id',
                    'Carro': '$Carro',
                    'Cor': '$Cor',
                    'Montadora': '$Montadora'
                }
            }
        }
    }, {
        '$addFields': {
            'CarrosElements': {
                '$concat': [
                    '[ ', {
                        '$toString': {
                            '$size': '$Carros'
                        }
                    }, ' elements ]'
                ]
            }
        }
    }, {
        '$project': {
            '_id': 1,
            'Carros': 1,
            'CarrosElements': 1
        }
    }
];

const client = await MongoClient.connect(
    'mongodb://localhost:27017/'
);
const coll = client.db('DATAOPS').collection('carros');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
