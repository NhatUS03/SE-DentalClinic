const {GetInFoDentist,GetDetailedAppointment,GetService}=require('../model/CURDService')
const sql=require('mssql')
const sqlConfig=require('../config/database')
const BenhNhan = require('../model/Customer');
const LichHen = require('../model/Appointment');
const bcrypt = require('bcryptjs');
const AppointmentHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    ListAppointments=await GetDetailedAppointment(req,res)
    
    res.render('customer/appointment.ejs',{Appointments:ListAppointments,user:data})
}

const CustomerMakeAppointmentHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    Services=await GetService(req,res)
    Dentists=await GetInFoDentist(req,res)
    res.render('customer/setAppointment.ejs',{Services:Services,Dentists:Dentists,user:data})
}
const CustomerRenderServicePage= async(req,res)=>{
    const listService= await GetService()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('customer/service.ejs',{user:req.session.user})
}
const CustomerProfileSettingHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    res.render('customer/profile-setting.ejs',{user:data})
}

function getCurrentDateTime() {
    const now = new Date();
    
    const year = now.getFullYear();
    let month = now.getMonth() + 1; // Tháng bắt đầu từ 0
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Đảm bảo rằng tháng, ngày, giờ, phút có dạng 2 chữ số
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    
    // Định dạng theo yyyy-mm-dd hh:mm
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    
    return formattedDateTime;
}

const PostCustomerMakeAppointmentHandler = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const { service, dentist, date, hour } = req.body;
    const user = req.session.user;

    try {
        // Combine date and hour into a datetime format
        const ThoiGianYeuCau = `${date} ${hour}`; // Assuming hour is in 'HH:mm' format
        
        const appointment = {
            NgayGioHen: getCurrentDateTime(),
            Phong: "F1", // Assuming 'service' is the room or service type
            GhiChu: '', // You can set this based on requirements
            ThoiGianYeuCau: ThoiGianYeuCau, // Current timestamp for request time in ISO format
            TinhTrang: 'Chờ Duyệt', // Initial status
            NhaSiKham: dentist, // Assuming 'dentist' is the doctor ID or identifier
            MaBenhNhan: user.id,
            MaDieuTri: service
        };

        // Create a new instance of LichHen
        const appointmentModel = await LichHen.create(appointment);
        console.log('Created appointment:', appointmentModel);

        // Redirect upon successful creation
        return res.redirect('/customer/appointment');
    } catch (error) {
        console.error('Error creating appointment:', error);
        // Handle error and redirect back to make-appointment page
        return res.redirect('/customer/make-appointment');
    }
};



module.exports={AppointmentHandler,CustomerMakeAppointmentHandler,CustomerRenderServicePage,CustomerProfileSettingHandler, PostCustomerMakeAppointmentHandler}

