
const sql=require('mssql')
const sqlConfig=require('../config/database')
const BenhNhan = require('../model/Customer');
const bcrypt = require('bcryptjs');

// For Admin Page
const {GetInFoDentist,GetDetailedAppointment,GetService,GetShift,GetStaff,GetCustomer,deleteService,AddService
    ,AddStaff,deleteStaff,AddDentist,deleteDentist,AddCustomer,deleteCustomer}=require('../model/CURDService')


//For Dashboard
const {CountCustomer,CountStaff,CountDentist,CountCustomerThroughMonth,
    CountStaffByPosition,CountDentistByQualification,CountTop5ServiceBestSeller}=require('../model/DashboardService')



//Service Handler

const RenderServicePage= async(req,res)=>{
    const listService= await GetService()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/service.ejs',{listService:listService,user:req.session.user})
}
const handleDeleteService = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const success = await deleteService(req.body.serviceId);
        if (success) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Service deletion failed.' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while deleting the service.' });
    }
}
const AddServiceHandler= async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const serviceId = await AddService(req.body);
        res.json({ success: true, message: 'Service added successfully.'});
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while adding the service.' });
    }
}


//Dentist Handler
const RenderDenstistPage= async(req,res)=>{
    const listDentist= await GetInFoDentist()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/dentist.ejs',{listDentist:listDentist,user:req.session.user})
}
const AddDentistHandler= async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const dentistId = await AddDentist(req.body);
        res.json({ success: true, message: 'Dentist added successfully.'});
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while adding the dentist.' });
    }
}
const handleDeleteDentist = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const success = await deleteDentist(req.body.dentistId);
        if (success) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Dentist deletion failed.' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while deleting the dentist.' });
    }
}

// Staff Handler
const RenderStaffPage= async(req,res)=>{
    const listStaff= await GetStaff()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/staff.ejs',{listStaff:listStaff,user:req.session.user})
}
const AddStaffHandler= async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const staffId = await AddStaff(req.body);
        res.json({ success: true, message: 'Staff added successfully.'});
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while adding the staff.' });
    }
}
const handleDeleteStaff = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const success = await deleteStaff(req.body.staffId);
        if (success) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Staff deletion failed.' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while deleting the staff.' });
    }
}

//Customer Handler
const RenderCustomerPage= async(req,res)=>{
    const listCustomer= await GetCustomer()
    if (!req.session.user) {
        return res.redirect('/login');
    }
    return res.render('admin/customer.ejs',{listCustomer:listCustomer,user:req.session.user})
}
const AddCustomerHandler= async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }

    try {
        const customerId = await AddCustomer(req.body);
        res.json({ success: true, message: 'Customer added successfully.'});
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while adding the customer.' });
    }
}
const handleDeleteCustomer = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    try {
        const success = await deleteCustomer(req.body.customerId);
        if (success) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Customer deletion failed.' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'An error occurred while deleting the customer.' });
    }
}

//Dashboard Handler
const RenderDashboardPage= async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }

    //Integer type
    const countCustomer=await CountCustomer()
    const countStaff=await CountStaff()
    const countDentist=await CountDentist()

    //Array type
    const countCustomerThroughMonth=await CountCustomerThroughMonth()
    const countStaffByPosition=await CountStaffByPosition()
    const countDentistByQualification=await CountDentistByQualification()

    //Object type
    const countTop5ServiceBestSeller=await CountTop5ServiceBestSeller()

    const _dashboard_data={
        countCustomer:countCustomer,
        countStaff:countStaff,
        countDentist:countDentist,
        countCustomerThroughMonth:countCustomerThroughMonth,
        countStaffByPosition:countStaffByPosition,
        countDentistByQualification:countDentistByQualification,
        countTop5ServiceBestSeller:countTop5ServiceBestSeller
    }
    return res.render('admin/dashboard.ejs',{user:req.session.user,dashboard:_dashboard_data})

}
module.exports={RenderServicePage,RenderDenstistPage,RenderStaffPage,RenderCustomerPage,RenderDashboardPage,
    handleDeleteService,AddServiceHandler,AddDentistHandler,handleDeleteDentist,AddStaffHandler,handleDeleteStaff,
    AddCustomerHandler,handleDeleteCustomer}