const {GetInFoDentist,GetDetailedAppointment,GetService}=require('../model/CURDService')
const sql=require('mssql')
const sqlConfig=require('../config/database')
const BenhNhan = require('../model/Customer');
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
module.exports={AppointmentHandler,CustomerMakeAppointmentHandler,CustomerRenderServicePage,CustomerProfileSettingHandler}

