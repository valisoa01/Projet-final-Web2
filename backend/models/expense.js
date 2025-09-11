module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    id_expense: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('One-time', 'Recurring'),
      allowNull: false,
      defaultValue: 'One-time',
    },
    receipt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user',
      },
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id_category',
      },
    },
  }, {
    tableName: 'expenses',
    timestamps: true,
  });

  return Expense;
};