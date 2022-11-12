// ~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~
import './css/styles.css'
import './images/5-stars.png'
import getData from './apiCalls'
import Customer from './classes/Customer'
import Room from './classes/Room'
import Booking from './classes/Booking'

// ~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~
let allCustomers
let allRooms
let allBookings
let currentCustomer
// ~~~~~~~~~~~~~~~~~~~~Query Selectors~~~~~~~~~~~~~~~~~~~~
const greeting = document.querySelector('#greeting')
const cost = document.querySelector('#costSummary')
const pastBookings = document.querySelector('#pastBookingDisplay')
const upcomingBookings = document.querySelector('#upcomingBookingDisplay')

// ~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~
window.addEventListener('load', fetchData())


// ~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~
function fetchData() {
    Promise.all([getData('customers'), getData('rooms'), getData('bookings')])
    .then(data => {
        console.log(data)
        allCustomers = data[0].customers
        allRooms = data[1].rooms
        allBookings = data[2].bookings
        currentCustomer = new Customer(allCustomers[Math.floor(Math.random() * allCustomers.length)])
        displayCustomerData(currentCustomer, allRooms, allBookings)
    })
}

function displayCustomerData(currentCustomer, allRooms, allBookings) {
    greeting.innerText = `Welcome, ${currentCustomer.name}!`
    cost.innerHTML = `Your total cost of bookings is $${currentCustomer.getTotalCost(allBookings, allRooms).toFixed(2)}.`
    let userAllBookings = currentCustomer.getAllBookings(allBookings)

    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currDate = `${year}/${month}/${day}`
 
    const userPastBookings = userAllBookings.filter(booking => booking.date < currDate)
    userPastBookings.forEach(booking => {
        allRooms.forEach(room => {
            if(booking.roomNumber === room.number) {
                pastBookings.innerHTML += 
                `<article class="booking-card">
                    <p>Date: ${booking.date}</p>
                    <p>Room ${booking.roomNumber}</p>
                    <p>${room.roomType.toUpperCase()}</p>
                    <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
                    <p>$${room.costPerNight}</p>
                </article>`
            }
        })
    })
   
    const userUpcomingBookings = userAllBookings.filter(booking => booking.date >= currDate)
    userUpcomingBookings.forEach(booking => {
        allRooms.forEach(room => {
            if(booking.roomNumber === room.number) {
                upcomingBookings.innerHTML += 
                `<article class="booking-card">
                    <p>Date: ${booking.date}</p>
                    <p>Room ${booking.roomNumber}</p>
                    <p>${room.roomType.toUpperCase()}</p>
                    <p>${room.numBeds} ${room.bedSize.charAt(0).toUpperCase()}${room.bedSize.slice(1)} Bed(s)</p>
                    <p>$${room.costPerNight}</p>
                </article>`
            }
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~Helper Functions~~~~~~~~~~~~~~~~~~~~