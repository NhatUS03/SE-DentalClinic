const {GetInFoDentist,GetDetailedAppointment,GetService,GetShift,GetStaff,GetCustomer}=require('../model/CURDService')
const sql=require('mssql')
const sqlConfig=require('../config/database')
const BenhNhan = require('../model/Customer');
const bcrypt = require('bcryptjs');


const RenderServicePage= async(req,res)=>{
    const listService= await GetService()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/service.ejs',{listService:listService,user:req.session.user})
}

const RenderDenstistPage= async(req,res)=>{
    const listDentist= await GetInFoDentist()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/dentist.ejs',{listDentist:listDentist,user:req.session.user})
}

const RenderStaffPage= async(req,res)=>{
    const listStaff= await GetStaff()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/staff.ejs',{listStaff:listStaff,user:req.session.user})
}
const RenderCustomerPage= async(req,res)=>{
    const listCustomer= await GetCustomer()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/customer.ejs',{listCustomer:listCustomer,user:req.session.user})
}
const RenderDashboardPage= async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/dashboard.ejs',{user:req.session.user})
}
module.exports={RenderServicePage,RenderDenstistPage,RenderStaffPage,RenderCustomerPage,RenderDashboardPage}