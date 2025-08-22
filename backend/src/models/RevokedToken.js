const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/database');

class RevokedToken extends Model {}

RevokedToken.init(
    {
        token: {
            type : DataTypes.TEXT,
            allowNull:false,
            unique:true,
        },
        expireAt: {
            type:DataTypes.DATE,
            allowNull:false,
        },
    },
    {
        sequelize,
        modelName:'RevokedToken',
        tableName: 'revoked_tokens',
        timestamps:true,
    }
);

module.exports= RevokedToken;