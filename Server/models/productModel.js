    // backend/models/Product.js
    const { DataTypes } = require('sequelize');
    const sequelize = require('../db.js');

    const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      tableName: 'products',
      timestamps: false,
      underscored: true
    });

    module.exports = Product;
    