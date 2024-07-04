const sql=require('mssql')
const sqlConfig=require('../config/database')


async function createConnectionPool(config) {
    try {
        // Tạo một pool connection mới
        const pool = await new sql.ConnectionPool(config).connect();

        // Lắng nghe sự kiện khi có lỗi kết nối
        pool.on('error', err => {
            console.error('Lỗi kết nối đến SQL Server:', err);
        });

        console.log('Pool kết nối đã được tạo.');
        return pool;
    } catch (err) {
        console.error('Lỗi khi tạo pool kết nối:', err);
        throw err;
    }
}
//Denstist
const GetInFoDentist= async(req,res)=>
{
    const pool= await createConnectionPool(sqlConfig)
    const result= await pool.query`select * from NHASI`
    return result.recordset
}


// Tạo bảng thông tin lịch hẹn của một bênh nhân 
const GetDetailedAppointment = async (req, res) => {
    const pool = await createConnectionPool(sqlConfig);
    
    const result = await pool.query`
        select lh.malichhen, lh.ngaygiohen,lh.ThoiGianYeuCau,dm.LoaiDieuTri,ns.TenNhaSi,lh.TinhTrang
        from lichhen as lh join nhasi as Ns on lh.NhaSiKham=ns.MaNhaSi join DanhMucDieuTri as dm on dm.MaDieuTri=lh.MaDieuTri
        where MaBenhNhan=${req.session.user.id}`;
    return result.recordset;
}

const GetUnConfirmAppointment = async (req, res) => {
    const pool = await createConnectionPool(sqlConfig);
    
    const result = await pool.query`
        select lh.malichhen, lh.ngaygiohen,lh.ThoiGianYeuCau,dm.LoaiDieuTri,ns.TenNhaSi,lh.TinhTrang
        from lichhen as lh join nhasi as Ns on lh.NhaSiKham=ns.MaNhaSi join DanhMucDieuTri as dm on dm.MaDieuTri=lh.MaDieuTri
        where lh.TinhTrang= N'Chờ Duyệt'`;
    return result.recordset;
}

const GetService= async(req,res)=>
{
    const pool= await createConnectionPool(sqlConfig)
    const result= await pool.query`select madieutri,loaidieutri,donvi,dongia,ThoiGianBaoHanh
                    from DanhMucDieuTri`
    return result.recordset
}
const GetShift=async(req,res)=>
{
    const pool= await createConnectionPool(sqlConfig)
    const result= await pool.query`select * from CaLam`
    return result.recordset
}
const GetStaff=async(req,res)=>
{
    const pool= await createConnectionPool(sqlConfig)
    const result= await pool.query`select * from NhanVien`
    return result.recordset
}

const GetCustomer=async(req,res)=>
{
    const pool= await createConnectionPool(sqlConfig)
    const result= await pool.query`select * from BenhNhan`
    return result.recordset
}
module.exports={GetInFoDentist,GetDetailedAppointment, GetUnConfirmAppointment,GetService,GetShift,GetStaff,GetCustomer}

