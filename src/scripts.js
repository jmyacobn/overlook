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
        console.log(currentCustomer)
        displayCustomerData(currentCustomer, allRooms, allBookings)
    })
}

function displayCustomerData(currentCustomer, allRooms, allBookings) {
    greeting.innerText = `Welcome, ${currentCustomer.name}!`
    cost.innerHTML = `Your total cost of bookings is $${currentCustomer.getTotalCost(allBookings, allRooms).toFixed(2)}.`
    let userAllBookings = currentCustomer.getAllBookings(allBookings)
    console.log(userAllBookings)

    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currDate = `${year}/${month}/${day}`
 

    //Display all past bookings as cards
    const userPastBookings = userAllBookings.filter(booking => booking.date < currDate)
    console.log(userPastBookings)
   
    //Display all upcoming bookings as cards
    const userUpcomingBookings = userAllBookings.filter(booking => booking.date >= currDate)
    console.log(userUpcomingBookings)
}

// ~~~~~~~~~~~~~~~~~~~~Helper Functions~~~~~~~~~~~~~~~~~~~~