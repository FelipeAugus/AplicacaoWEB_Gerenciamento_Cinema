const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('trabalho_optativa2', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

const defaultQueryHandler = (res) => {
  return (results) => {
      if (results) {
          console.log(results);
          res.status(200).json(results);
      }
  };
};

const exceptionQueryHandler = (res) => {
  return (exception) => {
      console.log(exception);
      res.status(400).json({
          error: exception
      })
  }
}

async function testeConnection() {
  try {
      await sequelize.authenticate();
      console.log('----- Conectado ao banco de dados -----');
  } catch (error) {
      console.error('Falha ao se conectar com o banco de dados:', error);
  }
}

testeConnection();

module.exports = { 
  sequelize,
  defaultQueryHandler,
  exceptionQueryHandler 
};
