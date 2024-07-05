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

const CountCustomer=async()=>{  
    const pool= await createConnectionPool(sqlConfig)
    const result= await pool.query`select count(*) as count from BenhNhan`
    return result.recordset[0].count
}
const CountStaff=async()=>{
    const pool= await createConnectionPool(sqlConfig)
    const result= await pool.query`select count(*) as count from NhanVien`
    return result.recordset[0].count
}
const CountDentist=async()=>{
    const pool= await createConnectionPool(sqlConfig)
    const result= await pool.query`select count(*) as count from NhaSi`
    return result.recordset[0].count
}
const CountCustomerThroughMonth=async()=>{
    const pool = await createConnectionPool(sqlConfig);
    const result = (await pool.query`select month(ngaygiohen) as Month, count(month(ngaygiohen)) as Count
                                    from lichhen 
                                    group by month(NgayGioHen)`).recordset;

    const countList = result.map(item => item.Count);
    return countList
}
const CountStaffByPosition=async()=>{
    const pool= await createConnectionPool(sqlConfig)
    const result=(await pool.query`select ViTri ,count(MaNV) as Count
                                from nhanvien
                                group by ViTri`).recordset
    const countList = result.map(item => item.Count);
    return countList
}
const CountDentistByQualification=async()=>{
    const pool= await createConnectionPool(sqlConfig)
    const result=(await pool.query`select HocVan, count(MaNhaSi) as Count 
                                    from NhaSi 
                                    group by HocVan`).recordset
    const countList = result.map(item => item.Count);
    return countList
}
function getFirstPart(inputString) {
    // Cắt chuỗi bằng ký tự '+'
    const parts = inputString.split('+');
    // Lấy phần đầu tiên của mảng và loại bỏ khoảng trắng đầu và cuối
    const firstPart = parts[0].trim();
    return firstPart;
}

const CountTop5ServiceBestSeller=async()=>{
    const pool= await createConnectionPool(sqlConfig)
    const result=(await pool.query`select top 5 DM.LoaiDieuTri, count(LH.MaLichHen) as Count
                                    from LichHen as LH join DanhMucDieuTri as DM on LH.MaDieuTri=DM.MaDieuTri
                                    group By (DM.LoaiDieuTri )
                                    ORDER by Count desc`).recordset

    // Một Số dịch vụ có tên dài, chỉ lấy phần đầu tiên của tên dịch vụ
    for (let i = 0; i < result.length; i++) {
        result[i].LoaiDieuTri = getFirstPart(result[i].LoaiDieuTri);
    }
    const nameList = result.map(item => item.LoaiDieuTri);
    const countList = result.map(item => item.Count);
    
    // Tạo một đối tượng mới chứa name và count
    const resultObject = {
        name: nameList,
        count: countList
    };
    return resultObject
}

module.exports={CountCustomer,CountStaff,CountDentist,CountCustomerThroughMonth,
    CountStaffByPosition,CountDentistByQualification,CountTop5ServiceBestSeller}