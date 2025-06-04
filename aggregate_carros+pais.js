// Arquivo exportado do mongoDB, contendo a primeira agregação solicitada no documento (item 1.4), com a tabela carros + o país

[
    {
        '$lookup': {
            'from': 'montadoras',
            'localField': 'Montadora',
            'foreignField': 'Montadora',
            'as': 'montadora'
        }
    }, {
        '$addFields': {
            'Montadoras': {
                '$literal': '[ 1 elements ]'
            }
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
            'Montadoras': 1,
            'País': '$montadora.País'
        }
    }
]

// Aqui está o mesmo arquivo com a sintaxe Node.js

const aggregate = [
  {
    $lookup: {
      from: 'montadoras',
      localField: 'Montadora',
      foreignField: 'Montadora',
      as: 'montadora'
    }
  },
  {
    $addFields: {
      Montadoras: { $literal: '[ 1 elements ]' }
    }
  },
  {
    $unwind: {
      path: '$montadora'
    }
  },
  {
    $project: {
      _id: 1,
      Carro: 1,
      Cor: 1,
      Montadora: 1,
      Montadoras: 1,
      País: '$montadora.País'
    }
  }
];

module.exports = aggregate;