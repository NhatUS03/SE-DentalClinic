const {GetInFoDentist,GetDetailedAppointment,GetService}=require('../model/CURDService')
const sql=require('mssql')
const sqlConfig=require('../config/database')
const BenhNhan = require('../model/Customer');
const bcrypt = require('bcryptjs');

const DentistAppointmentHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    ListAppointments=await GetDetailedAppointment(req,res)
    
    res.render('dentist/appointment.ejs',{Appointments:ListAppointments,user:data})
}
const DentistRemindAppointmentHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    ListAppointments=await GetDetailedAppointment(req,res)
    
    res.render('dentist/remind-appointment.ejs',{Appointments:ListAppointments,user:data})
}
const DentistRenderPatientRecordPage=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    ListAppointments=await GetDetailedAppointment(req,res)
    
    res.render('dentist/patient-record.ejs',{Appointments:ListAppointments,user:data})
}
const DentistAccountSettingHandler=async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    data=req.session.user
    res.render('dentist/profile-setting.ejs',{user:data})
}
module.exports={DentistAppointmentHandler,DentistRemindAppointmentHandler,DentistRenderPatientRecordPage,
                DentistAccountSettingHandler}