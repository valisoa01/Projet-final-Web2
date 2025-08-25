module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING(50),
    email: DataTypes.STRING(100),
    password_hash: DataTypes.STRING(255),
    profileUrl: DataTypes.TEXT // Allow null by default
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};