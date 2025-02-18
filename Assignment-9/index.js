document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();    
    let name = document.getElementById('fullName').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let service = document.getElementById('service').value;
    let dateTime = document.getElementById('dateTime').value;
    let terms = document.getElementById('terms').checked;
    let valid = true;
    if (name === "") {
        document.getElementById('nameError').innerText = "Name is required";
        valid = false;
    } else {
        document.getElementById('nameError').innerText = "";
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
        document.getElementById('emailError').innerText = "Invalid email format";
        valid = false;
    } else {
        document.getElementById('emailError').innerText = "";
    }
    if (!phone.match(/^\d{10}$/)) {
        document.getElementById('phoneError').innerText = "Phone must be 10 digits";
        valid = false;
    } else {
        document.getElementById('phoneError').innerText = "";
    }
    let currentDateTime = new Date().toISOString().slice(0, 16);
    if (dateTime <= currentDateTime) {
        document.getElementById('dateTimeError').innerText = "Date must be in the future";
        valid = false;
    } else {
        document.getElementById('dateTimeError').innerText = "";
    }
    if (!terms) {
        document.getElementById('termsError').innerText = "You must agree to terms";
        valid = false;
    } else {
        document.getElementById('termsError').innerText = "";
    }
    if (valid) {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        let newAppointment = { name, service, dateTime, status: "Pending" };
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        document.getElementById('appointmentForm').reset();
        alert(`Thank you, ${name}! Your appointment for ${service} on ${dateTime} is confirmed.`);
        displayAppointments();
    }
});
function displayAppointments() {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let tableBody = document.querySelector("#appointmentsTable tbody");
    tableBody.innerHTML = "";
    appointments.forEach((appt) => {
        let row = tableBody.insertRow();
        row.insertCell(0).innerText = appt.name;
        row.insertCell(1).innerText = appt.service;
        row.insertCell(2).innerText = appt.dateTime;
        row.insertCell(3).innerText = appt.status;
    });
}
function openBookingForm(service) {
    document.getElementById("service").value = service;
    document.getElementById("appointmentFormContainer").classList.remove("hidden");
}
window.onload = displayAppointments;
