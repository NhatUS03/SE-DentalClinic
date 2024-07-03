const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const NhaSi = sequelize.define('NhaSi', {
    MaNhaSi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TenNhaSi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NgaySinh: {
        type: DataTypes.DATE
    },
    GioiTinh: {
        type: DataTypes.STRING,
        allowNull: true
    },
    DiaChi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    SDT: {
        type: DataTypes.STRING,
        allowNull: true
    },
    TaiKhoan: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    MatKhau: {
        type: DataTypes.STRING,
        allowNull: false
    },
    HocVan: {
        type: DataTypes.STRING,
        allowNull: true
    },
    AnhDaiDien: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, {
        freezeTableName: true,
        tableName: 'NhaSi'
});

module.exports = NhaSi;
