const bcrypt = require('bcryptjs');
const QuanTriVien = require('../model/Admin');
const NhanVien = require('../model/Staff');
const NhaSi = require('../model/Dentist');
const BenhNhan = require('../model/Customer');
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Tìm người dùng trong từng bảng
        let user = await QuanTriVien.findOne({ where: { TaiKhoan: username },attributes: { exclude: ['createdAt', 'updatedAt'] } });
        let role = 'QuanTriVien';
    
        if (!user) {
            user = await NhanVien.findOne({ where: { TaiKhoan: username } ,attributes: { exclude: ['createdAt', 'updatedAt'] }});
            role = 'NhanVien';
        }

        if (!user) {
            user = await NhaSi.findOne({ where: { TaiKhoan: username },attributes: { exclude: ['createdAt', 'updatedAt'] } });
            role = 'NhaSi';
        }
        if (!user) {
            user = await BenhNhan.findOne({ where: { TaiKhoan: username },attributes: { exclude: ['createdAt', 'updatedAt'] } });
            role = 'BenhNhan';
        }
        // Kiểm tra mật khẩu
        if (!user || !(await bcrypt.compare(password, user.MatKhau))) {
            return res.render('login', { message: 'Tài khoản hoặc mật khẩu không đúng' });
        }


        let data=null
        // Lấy thông tin người dùng
        if (role === 'QuanTriVien') {
            data={
                taiKhoan: user.TaiKhoan,
                role: role,
                id:user.MaQTV,
                hoten:user.TenQTV,
                ngaysinh:user.NgaySinh,
                gioitinh:user.GioiTinh,
                diachi:user.DiaChi,
                sdt:user.SDT,
            }
        }
        else if (role === 'NhanVien') {
            data={
                taiKhoan: user.TaiKhoan,
                role: role,
                id:user.MaNV,
                hoten:user.TenNV,
                ngaysinh:user.NgaySinh,
                gioitinh:user.GioiTinh,
                diachi:user.DiaChi,
                sdt:user.SDT,
                vitri:user.ViTri
            }
        }
        else if (role === 'NhaSi') {
            data={
                taiKhoan: user.TaiKhoan,
                role: role,
                id:user.MaNhaSi,
                hoten:user.TenNhaSi,
                ngaysinh:user.NgaySinh,
                gioitinh:user.GioiTinh,
                diachi:user.DiaChi,
                sdt:user.SDT,
                hocvan:user.HocVan,
                anhdaidien:user.AnhDaiDien
            }
        }
        else if (role === 'BenhNhan') {
            data={
                taiKhoan: user.TaiKhoan,
                role: role,
                id:user.MaBenhNhan,
                hoten:user.TenBenhNhan,
                ngaysinh:user.NgaySinh,
                gioitinh:user.GioiTinh,
                diachi:user.DiaChi,
                sdt:user.SDT
            }
        }
        // Lưu thông tin người dùng vào session
        req.session.user = data;



        // Chuyển hướng đến trang dashboard tương ứng
        switch (role) {
            case 'QuanTriVien':
                res.redirect('/admin');
                break;
            case 'NhanVien':
                res.redirect('/staff');
                break;
            case 'NhaSi':
                res.redirect('/dentist');
                break;
            case 'BenhNhan':
                res.redirect('/customer');
                break;
            default:
                res.redirect('/');
        }
    } catch (err) {
        console.error('Lỗi:', err.message);
        res.status(500).send('Lỗi máy chủ');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
