const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const QuanTriVien = sequelize.define('QuanTriVien', {
    MaQTV: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TenQTV: {
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
    }
    }, {
        freezeTableName: true,
        tableName: 'QuanTriVien'
    });

module.exports = QuanTriVien;
