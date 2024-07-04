const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class LichHen extends Model {}

LichHen.init({
    MaLichHen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NgayGioHen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Phong: {
        type: DataTypes.STRING,
        allowNull: false
    },
    GhiChu: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ThoiGianYeuCau: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TinhTrang: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NhaSiKham: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MaBenhNhan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MaDieuTri: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'LichHen',
    tableName: 'LichHen',
    timestamps: false // Disable timestamps
});

module.exports = LichHen;
