/* @arquivo UsuarioEndereco.js */

module.exports = function (database, DataTypes) {
  
  var VERSAO_BANCO_DADOS = 1;
    
  var UsuarioEndereco = database.define('UsuarioEndereco', {
    
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    
    logradouro: { type: DataTypes.STRING, validate: {} },
    complemento: { type: DataTypes.STRING, validate: {} }, 
    bairro: { type: DataTypes.STRING, validate: {} },
    numero: { type: DataTypes.STRING, validate: {} },
    cidade: { type: DataTypes.STRING, validate: {} }
  }, {
    
    associar: function (modelos) {
      // NOTA: Não ativar esta relação abaixo, pois o BackBone-Relational não vai funcionar corretamente...
      //modelos.UsuarioEndereco.belongsTo(modelos.Usuarios, { foreignKey: 'usuario_id', as: 'Usuarios' });
    },
    underscored: true, // Lembre-se de que utilizamos o padrão snake_case
    timestamps: false,
    freezeTableName: true,
    tableName: 'UsuarioEndereco'
  });

  return {
    mod: UsuarioEndereco
  , versao: VERSAO_BANCO_DADOS
  }
};