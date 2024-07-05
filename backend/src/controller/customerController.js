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
    
    // Get the date and time in Vietnam (UTC+7)
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour format
    };
    
    // Format the date and time
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const parts = formatter.formatToParts(now);
    
    let year, month, day, hour, minute;
    for (const part of parts) {
        if (part.type === 'year') year = part.value;
        if (part.type === 'month') month = part.value;
        if (part.type === 'day') day = part.value;
        if (part.type === 'hour') hour = part.value;
        if (part.type === 'minute') minute = part.value;
    }
    
    // Định dạng theo yyyy-mm-dd hh:mm
    const formattedDateTime = `${year}-${month}-${day} ${hour}:${minute}`;
    
    return formattedDateTime;
}

const CustomerCancelAppointmentHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    
    const appointmentId = req.body.appointmentId;
    console.log('appointmentId:', appointmentId);
    LichHen.findOne({ where: { MaLichHen: appointmentId } })
    .then(lichHen => {
        if (lichHen) {
            // Cập nhật trường TinhTrang
            lichHen.update({ TinhTrang: 'Đã Hủy' })
                .then(updatedLichHen => {
                    console.log('Đã cập nhật trạng thái lịch hẹn thành công.');
                    // Xử lý khi cập nhật thành công
                })
                .catch(err => {
                    console.error('Lỗi khi cập nhật trạng thái lịch hẹn:', err);
                    // Xử lý khi cập nhật gặp lỗi
                });
        } else {
            console.error('Không tìm thấy lịch hẹn có MaLichHen =', appointmentId);
            // Xử lý khi không tìm thấy lịch hẹn
        }
    })
    .catch(err => {
        console.error('Lỗi khi tìm kiếm lịch hẹn:', err);
        
    });

    return res.redirect('/customer/appointment');
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



module.exports={AppointmentHandler,CustomerMakeAppointmentHandler,CustomerRenderServicePage,CustomerProfileSettingHandler, PostCustomerMakeAppointmentHandler, CustomerCancelAppointmentHandler}

