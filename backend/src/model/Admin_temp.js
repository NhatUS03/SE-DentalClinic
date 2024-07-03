// const sql=require('mssql')
// const sqlConfig=require('../config/database')


// async function createConnectionPool(config) {
//     try {
//         // Tạo một pool connection mới
//         const pool = await new sql.ConnectionPool(config).connect();

//         // Lắng nghe sự kiện khi có lỗi kết nối
//         pool.on('error', err => {
//             console.error('Lỗi kết nối đến SQL Server:', err);
//         });

//         console.log('Pool kết nối đã được tạo.');
//         return pool;
//     } catch (err) {
//         console.error('Lỗi khi tạo pool kết nối:', err);
//         throw err;
//     }
// }

// //Admin
// const GetInFoAdmin= async(req,res)=>
// {
//     const pool= await createConnectionPool(sqlConfig)
//     const result= await pool.query`select * from QuanTriVien`
//     return result.recordset
// }
// module.exports={GetInFoAdmin}