 module.exports = [
  {
    "model": "Usuarios",
    "data": {
      "id": 1,
      "nome": "Fulano da Silva",
      "jid": "fulano@localhost",
      "senha": "$2a$05$aC3/OQT/UOFgLaBUkygfYOeTgQpN9jGRQsuWeDvTX3WHvSESbfGz."
    }
  },
  {
    "model": "Usuarios",
    "data": {
      "id": 2,
      "nome": "Fulana Dias",
      "jid": "fulana@localhost",
      "senha": "$2a$05$aC3/OQT/UOFgLaBUkygfYOeTgQpN9jGRQsuWeDvTX3WHvSESbfGz."
    }
  },
  {
    "model": "Usuarios",
    "data": {
      "id": 3,
      "nome": "Ciclano Domingues",
      "jid": "ciclano@localhost",
      "senha": "$2a$05$aC3/OQT/UOFgLaBUkygfYOeTgQpN9jGRQsuWeDvTX3WHvSESbfGz."
    }
  },

  {
    "model": "Funcoes",
    "data": {
      "id": 1,
      "bandeira": "40",
      "usuario_id": 1
    }
  },
  {
    "model": "Funcoes",
    "data": {
      "id": 2,
      "bandeira": "40",
      "usuario_id": 2
    }
  },
  {
    "model": "Funcoes",
    "data": {
      "id": 3,
      "bandeira": "40",
      "usuario_id": 3
    }
  },
  
  {
    "model": "Projetos",
    "data": {
      "id": 1,
      "descricao": "Enviar uma missão a Marte.",
      "usuario_id": 1
    }
  },
  {
    "model": "Projetos",
    "data": {
      "id": 2,
      "descricao": "Enviar missão a Lua.",
      "usuario_id": 1
    }
  },
  {
    "model": "Projetos",
    "data": {
      "id": 3,
      "descricao": "Desenvolver o sistema de propulção com combustivel sólido.",
      "usuario_id": 2
    }
  }
];