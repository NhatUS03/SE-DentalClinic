const { Sequelize } = require('sequelize');

// Thiết lập kết nối đến SQL Server
const sequelize = new Sequelize('DentalClinic', process.env.USER_DB, process.env.PASSWORD_DB, {
    host: 'localhost', // Đổi lại địa chỉ host nếu cần thiết
    dialect: 'mssql',
    // dialectOptions: {
    //     options: {
    //         encrypt: true, // Sử dụng mã hóa kết nối (nếu cần thiết)
    //         trustServerCertificate: true // Đảm bảo sử dụng chứng chỉ từ máy chủ (nếu cần thiết)
    //     }
    // }
});

// Kiểm tra kết nối
sequelize.authenticate()
    .then(() => {
        console.log('Connection to MSSQL database successful');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
