const {GetInFoDentist,GetDetailedAppointment,GetService}=require('../model/CURDService')
const sql=require('mssql')
const sqlConfig=require('../config/database')
const BenhNhan = require('../model/Customer');
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
    ListAppointments=await GetDetailedAppointment(req,res)
    
    res.render('staff/appointment.ejs',{Appointments:ListAppointments,user:data})
}
const StaffPatientRecordHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    res.render('staff/patient-record.ejs',{user:data})
}
const StaffAccountSettingHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    res.render('staff/profile-setting.ejs',{user:data})
}
module.exports={StaffRenderDashboardPage,StaffAppointmentHandler,StaffPatientRecordHandler,
                StaffAccountSettingHandler}
