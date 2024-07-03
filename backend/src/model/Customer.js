const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BenhNhan = sequelize.define('BenhNhan', {
    MaBenhNhan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    TenBenhNhan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NgaySinh: {
        type: DataTypes.DATE,
        allowNull: true
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
        //freezeTableName: true,
        tableName: 'BenhNhan',
        timestamps: false // Tắt chức năng tự động thêm createdAt và updatedAt
    });
module.exports = BenhNhan;
