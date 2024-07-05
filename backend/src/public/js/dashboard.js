// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Example data
    const totalCustomers = 1234;
    const totalEmployees = 56;
    const totalDentists = 34;

    // Set values
    document.getElementById('totalCustomersCount').textContent = totalCustomers;
    document.getElementById('totalEmployeesCount').textContent = totalEmployees;
    document.getElementById('totalDentistsCount').textContent = totalDentists;

    // Customer over time data
    const customersOverTimeData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Customers',
            data: [30, 50, 80, 60, 100, 120, 150],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    };

    // Employee structure data
    const employeeStructureData = {
        labels: ['Receptionist', 'Assistant', 'Technician', 'Dentist'],
        datasets: [{
            label: 'Employees',
            data: [10, 15, 20, 11],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Dentist education data
    const dentistEducationData = {
        labels: ['Bachelor', 'Master', 'PhD'],
        datasets: [{
            label: 'Dentists',
            data: [20, 10, 4],
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Most booked treatments data
    const mostBookedTreatmentsData = {
        labels: ['Cleaning', 'Filling', 'Whitening', 'Braces'],
        datasets: [{
            label: 'Treatments',
            data: [120, 90, 60, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Line Chart
    new Chart(document.getElementById('customersOverTime'), {
        type: 'line',
        data: customersOverTimeData,
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Number of Customers'
                    }
                }
            }
        }
    });

    // Bar Chart for Employee Structure
    new Chart(document.getElementById('employeeStructure'), {
        type: 'bar',
        data: employeeStructureData,
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Position'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Number of Employees'
                    }
                }
            }
        }
    });

    // Pie Chart for Dentist Education
    new Chart(document.getElementById('dentistEducation'), {
        type: 'pie',
        data: dentistEducationData,
        options: {
            responsive: true
        }
    });

    // Pie Chart for Most Booked Treatments
    new Chart(document.getElementById('mostBookedTreatments'), {
        type: 'pie',
        data: mostBookedTreatmentsData,
        options: {
            responsive: true
        }
    });
});
