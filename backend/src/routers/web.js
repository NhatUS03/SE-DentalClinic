const express=require('express')

//Homecontroller
const { getHomePage,RegisterHandler,logoutHandler,LoginAsAdmin,LoginAsCustomer
        ,LoginAsStaff,LoginAsDentist} = require('../controller/homeController')

//AdminController
const {RenderServicePage,RenderDenstistPage,RenderStaffPage,
    RenderCustomerPage,RenderDashboardPage}=require('../controller/adminController')


//CustomerController
const {AppointmentHandler,CustomerMakeAppointmentHandler,
    CustomerRenderServicePage,CustomerProfileSettingHandler}=require('../controller/customerController')

//DentistController
const {DentistAppointmentHandler,DentistRemindAppointmentHandler,
    DentistRenderPatientRecordPage,DentistAccountSettingHandler}=require('../controller/dentistController')

//StaffController
const {StaffRenderDashboardPage,StaffAppointmentHandler,StaffPatientRecordHandler,
                StaffAccountSettingHandler}=require('../controller/staffController')
//AuthController
const authController = require('../controller/authController');
const router=express.Router()


// Register, Login, Logout
router.get('/',getHomePage)
router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login);
router.get('/logout', logoutHandler);
router.get('/register', (req, res) => res.render('register'));
router.post('/register', RegisterHandler);

// Homepage
router.get('/dentist',LoginAsDentist)
router.get('/staff',LoginAsStaff)
router.get('/customer',LoginAsCustomer)
router.get('/admin',LoginAsAdmin)

// Customer
router.get('/customer/service', CustomerRenderServicePage)
router.get('/customer/profile',CustomerProfileSettingHandler)
router.get('/customer/appointment',AppointmentHandler)
router.get('/customer/make-appointment',CustomerMakeAppointmentHandler)

// Admin 
router.get('/admin/service',RenderServicePage)
router.get('/admin/dentist',RenderDenstistPage)
router.get('/admin/staff',RenderStaffPage)
router.get('/admin/customer',RenderCustomerPage)
router.get('/admin/dashboard',RenderDashboardPage)



// Dentist
router.get('/dentist/appointment',DentistAppointmentHandler)
router.get('/dentist/remind',DentistRemindAppointmentHandler)
router.get('/dentist/patient-record',DentistRenderPatientRecordPage)
router.get('/dentist/setting',DentistAccountSettingHandler)


// Staff
router.get('/staff/dashboard',StaffRenderDashboardPage)
router.get('/staff/appointment',StaffAppointmentHandler)
router.get('/staff/patient-record',StaffPatientRecordHandler)
router.get('/staff/setting',StaffAccountSettingHandler)
module.exports = router;