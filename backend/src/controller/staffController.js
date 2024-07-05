const {GetInFoDentist,GetDetailedAppointment, GetUnConfirmAppointment,GetService, GetCustomer}=require('../model/CURDService')
const sql=require('mssql')
const sqlConfig=require('../config/database')
const BenhNhan = require('../model/Customer');
const LichHen = require('../model/Appointment');
const bcrypt = require('bcryptjs');




const StaffRenderDashboardPage=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    res.render('staff/dashboard.ejs',{user:data})
}
const StaffAppointmentHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    ListAppointments=await GetUnConfirmAppointment(req,res)
    console.log(ListAppointments)
    res.render('staff/appointment.ejs',{Appointments:ListAppointments,user:data})
}
const StaffPatientRecordHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    listCustomer=await GetCustomer(req,res)
    res.render('staff/patient-record.ejs',{user:data, listCustomer:listCustomer})
}
const StaffAccountSettingHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    res.render('staff/profile-setting.ejs',{user:data})
}

const StaffCancelAppointmentHandler=async(req,res)=>{
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

    return res.redirect('/staff/appointment');
}



const StaffConfirmAppointmentHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    
    const appointmentId = req.body.appointmentId;
    console.log('appointmentId:', appointmentId);
    LichHen.findOne({ where: { MaLichHen: appointmentId } })
    .then(lichHen => {
        if (lichHen) {
            // Cập nhật trường TinhTrang
            lichHen.update({ TinhTrang: 'Đã Duyệt' })
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
    return res.redirect('/staff/appointment');

}


module.exports={StaffRenderDashboardPage,StaffAppointmentHandler,StaffPatientRecordHandler,
                StaffAccountSettingHandler, StaffCancelAppointmentHandler, StaffConfirmAppointmentHandler}
