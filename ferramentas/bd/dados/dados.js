 module.exports = [
  {
    "model": "Usuarios",
    "data": {
      "id": 1,
      "nome": "Fulano da Silva",
      "jid": "fulano@localhost",
      "senha": "$2a$05$aC3/OQT/UOFgLaBUkygfYOeTgQpN9jGRQsuWeDvTX3WHvSESbfGz.",
      "estatos": "40"
    }
  },
  {
    "model": "Usuarios",
    "data": {
      "id": 2,
      "nome": "Fulana Dias",
      "jid": "fulana@localhost",
      "senha": "$2a$05$aC3/OQT/UOFgLaBUkygfYOeTgQpN9jGRQsuWeDvTX3WHvSESbfGz.",
      "estatos": "40"
    }
  },
  {
    "model": "Usuarios",
    "data": {
      "id": 3,
      "nome": "Ciclano Domingues",
      "jid": "ciclano@localhost",
      "senha": "$2a$05$aC3/OQT/UOFgLaBUkygfYOeTgQpN9jGRQsuWeDvTX3WHvSESbfGz.",
      "estatos": "40"
    }
  },

  {
    "model": "Funcoes",
    "data": {
      "id": 1,
      "nome": "Gerente",
      "usuario_id": 1
    }
  },
  {
    "model": "Funcoes",
    "data": {
      "id": 2,
      "nome": "Bioquimico",
      "usuario_id": 2
    }
  },
  {
    "model": "Funcoes",
    "data": {
      "id": 3,
      "nome": "Atendente",
      "usuario_id": 3
    }
  },
  
  {
    "model": "Escopos",
    "data": {
      "id": 1,
      "nome": "Usuarios",
      "bandeira": "40",
      "funcao_id": 1
    }
  },
  {
    "model": "Escopos",
    "data": {
      "id": 2,
      "nome": "Usuarios",
      "bandeira": "40",
      "funcao_id": 2
    }
  },
  {
    "model": "Escopos",
    "data": {
      "id": 3,
      "nome": "Usuarios",
      "bandeira": "40",
      "funcao_id": 3
    }
  },
  {
    "model": "Escopos",
    "data": {
      "id": 4,
      "nome": "Pacientes",
      "bandeira": "40",
      "funcao_id": 3
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