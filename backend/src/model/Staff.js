const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const NhanVien = sequelize.define('NhanVien', {
    MaNV: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TenNV: {
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
    ViTri: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, {
        freezeTableName: true,
        tableName: 'NhanVien'
});

module.exports = NhanVien;
