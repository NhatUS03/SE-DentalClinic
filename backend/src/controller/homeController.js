const {GetInFoDentist}=require('../model/CURDService')
const sql=require('mssql')
const sqlConfig=require('../config/database')
const BenhNhan = require('../model/Customer');
const bcrypt = require('bcryptjs');
const getHomePage= async(req,res) =>{
    ListDentists= await GetInFoDentist()
    return res.render('homepage/homepage.ejs',{ListDentists:ListDentists})
} 
const RegisterHandler= async(req,res)=>{
    const { name,accountname,phonenumber, password,cfpassword } = req.body;
    console.log(req.body)
    try {
        // Kiểm tra xem tên người dùng đã tồn tại chưa
        const existingUser = await BenhNhan.findOne({ where: { TaiKhoan:accountname } ,attributes: { exclude: ['createdAt', 'updatedAt'] }});

        if (existingUser) {
            return res.render('register', { error: 'Username already exists' });
        }
        //Xác thực mật khẩu
        if (password !== cfpassword) {
            return res.render('register', { error: 'Passwords do not match' });
        }
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        

        //Tìm mã bệnh nhân có giá trị lớn nhất trong bảng bệnh nhân để tạo mã bệnh nhân mới
        const lastCustomer=await BenhNhan.findOne({order: [ [ 'MaBenhNhan', 'DESC' ]],attributes: { exclude: ['createdAt', 'updatedAt'] }})
        let id_=1
        if(lastCustomer){
            id_=lastCustomer.MaBenhNhan+1
        }
        // Tạo người dùng mới
        const benhNhan = BenhNhan.build({
            MaBenhNhan:parseInt(id_, 10),
            TenBenhNhan:name,
            SDT:phonenumber,
            TaiKhoan:accountname,
            MatKhau:hashedPassword
        });
        // Lưu người dùng vào cơ sở dữ liệu
        await benhNhan.save({ hooks: false });
        // Chuyển hướng người dùng đến trang đăng nhập
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.render('register', { error: 'An error occurred. Please try again.' });
    }
}

const logoutHandler=(req,res)=>{
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Lỗi khi đăng xuất');
        }
        res.clearCookie('connect.sid'); // Xóa cookie phiên
        res.render('homepage/homepage.ejs');
    });
}

const LoginAsAdmin=(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('admin/admin.ejs',{user:req.session.user})
}
const LoginAsCustomer = async (req,res)=>{
    
    if (!req.session.user) {
        return res.redirect('/login');
    }
    ListDentists= await GetInFoDentist()
    res.render('customer/customer.ejs',{user:req.session.user,ListDentists:ListDentists})
}
const LoginAsStaff=(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('staff/staff.ejs',{user:req.session.user})
}
const LoginAsDentist=(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('dentist/dentist.ejs',{user:req.session.user})
}
module.exports={getHomePage,RegisterHandler,logoutHandler,LoginAsAdmin,LoginAsCustomer,LoginAsStaff,LoginAsDentist}

