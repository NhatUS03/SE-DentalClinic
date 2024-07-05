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

//Delete Service by ServiceID 
const deleteService = async (serviceId) => {
    const pool = await createConnectionPool(sqlConfig);
    try {
        await pool.query`DELETE FROM DanhMucDieuTri WHERE MaDieuTri = ${serviceId}`;
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};
//Add Service

const AddService = async (service) => {
    const pool = await createConnectionPool(sqlConfig);
    const { loaidieutri, donvi, dongia, ThoiGianBaoHanh } = service;
    const result = await pool.query`SELECT TOP 1 MaDieuTri FROM DanhMucDieuTri ORDER BY MaDieuTri DESC`;
    const lastServiceID = result.recordset.length > 0 ? result.recordset[0].MaDieuTri : null;
    const newServiceID=lastServiceID+1
    try {
        await pool.query`insert into DanhMucDieuTri(MaDieuTri,LoaiDieuTri, DonVi, DonGia, ThoiGianBaoHanh) values(${newServiceID},${loaidieutri}, ${donvi}, ${dongia}, ${ThoiGianBaoHanh})`;
        return newServiceID;
    } catch (err) {
        throw new Error('Failed to add service');
    }
};


//Add Nhan Vien 
const AddStaff = async (staff) => {
    const pool = await createConnectionPool(sqlConfig);
    // Họ Tên	Ngày Sinh	Giới Tính	Địa Chỉ	Số Điện Thoại	Vị Trí
    const { TenNhanVien, NgaySinh, GioiTinh, DiaChi, SDT, ViTri } = staff;
    const result = await pool.query`SELECT TOP 1 MaNV FROM NhanVien ORDER BY MANV DESC`;
    const lastStaffID = result.recordset.length > 0 ? result.recordset[0].MaNhanVien : null;
    const newStaffID=lastStaffID+1
    try {
        await pool.query`insert into NhanVien(MaNV,TenNhanVien,NgaySinh,GioiTinh,DiaChi,SDT,ViTri) 
            values(${newStaffID},${TenNhanVien}, ${NgaySinh}, ${GioiTinh}, ${DiaChi},${SDT},${ViTri})`;
        return newStaffID;
    } catch (err) {
        throw new Error('Failed to add staff');
    }
}

//Delete Nhan Vien by StaffID
const deleteStaff = async (staffId) => {
    const pool = await createConnectionPool(sqlConfig);
    try {
        await pool.query`DELETE FROM NhanVien WHERE MaNV = ${staffId}`;
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

//Add Nha Si
//Họ Tên	Ngày Sinh	Giới Tính	Địa Chỉ	Số Điện Thoại	Học Vấn
const AddDentist = async (dentist) => {
    const pool = await createConnectionPool(sqlConfig);
    const { TenNhaSi, NgaySinh, GioiTinh, DiaChi, SDT, HocVan } = dentist;
    const result = await pool.query`SELECT TOP 1 MaNhaSi FROM NhaSi ORDER BY MaNhaSi DESC`;
    const lastDentistID = result.recordset.length > 0 ? result.recordset[0].MaNhaSi : null;
    const newDentistID=lastDentistID+1
    try {
        await pool.query`insert into NhaSi(MaNhaSi,TenNhaSi,NgaySinh,GioiTinh,DiaChi,SDT,HocVan) 
            values(${newDentistID},${TenNhaSi}, ${NgaySinh}, ${GioiTinh}, ${DiaChi},${SDT},${HocVan})`;
        return newDentistID;
    } catch (err) {
        throw new Error('Failed to add dentist');
    }
}

//Delete Nha Si by DentistID
const deleteDentist = async (dentistId) => {
    const pool = await createConnectionPool(sqlConfig);
    try {
        await pool.query`DELETE FROM NhaSi WHERE MaNhaSi = ${dentistId}`;
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

//Add Benh Nhan
//Tên Bệnh Nhân	Ngày Sinh	Giới Tính	Địa Chỉ	Số Điện Thoại
const AddCustomer = async (customer) => {
    const pool = await createConnectionPool(sqlConfig);
    const { TenBenhNhan, NgaySinh, GioiTinh, DiaChi, SDT } = customer;
    const result = await pool.query`SELECT TOP 1 MaBenhNhan FROM BenhNhan ORDER BY MaBenhNhan DESC`;
    const lastCustomerID = result.recordset.length > 0 ? result.recordset[0].MaBenhNhan : null;
    const newCustomerID=lastCustomerID+1
    try {
        await pool.query`insert into BenhNhan(MaBenhNhan,TenBenhNhan,NgaySinh,GioiTinh,DiaChi,SDT) 
            values(${newCustomerID},${TenBenhNhan}, ${NgaySinh}, ${GioiTinh}, ${DiaChi},${SDT})`;
        return newCustomerID;
    } catch (err) {
        throw new Error('Failed to add customer');
    }
}

//Delete Benh Nhan by CustomerID
const deleteCustomer = async (customerId) => {
    const pool = await createConnectionPool(sqlConfig);
    try {
        await pool.query`DELETE FROM BenhNhan WHERE MaBenhNhan = ${customerId}`;
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}
module.exports={GetInFoDentist,GetDetailedAppointment,GetService,GetUnConfirmAppointment,GetShift,GetStaff,GetCustomer,deleteService,AddService
    ,AddStaff,deleteStaff,AddDentist,deleteDentist,AddCustomer,deleteCustomer}

