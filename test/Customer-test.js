import { expect } from 'chai'
import Customer from '../src/classes/Customer'
import { sampleCustomers, sampleRooms, sampleBookings } from '../src/sample-data'

describe('Customer', () => {
  sampleCustomers
  sampleRooms
  sampleBookings
  let customer1, customer2, customer3, customer4, date, day, month, year, currDate

  beforeEach(() => {
    customer1 = new Customer(sampleCustomers[0])
    customer2 = new Customer(sampleCustomers[1])
    customer3 = new Customer(sampleCustomers[3])
    customer4 = new Customer(sampleCustomers[4])
    date = new Date()
    day = date.getDate()
    month = date.getMonth() + 1
    year = date.getFullYear()
    currDate = `${year}/${month}/${day}`
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function')
  })

  it('should have property of id', () => {
    expect(customer1.id).to.equal(1)
    expect(customer2.id).to.equal(2)
    expect(customer3.id).to.equal(4)
    expect(customer4.id).to.equal(5)
  })

  it('should have property of name', () => {
    expect(customer1.name).to.equal('Leatha Ullrich')
    expect(customer2.name).to.equal('Rocio Schuster')
    expect(customer3.name).to.equal('Kennedi Emard')
    expect(customer4.name).to.equal('Rhiannon Little')
  })

  it('should have method to get all customer bookings', () => {
    expect(customer1.getAllBookings(sampleBookings)).to.deep.equal([sampleBookings[0], sampleBookings[1], sampleBookings[2]])
    expect(customer2.getAllBookings(sampleBookings)).to.deep.equal([sampleBookings[3], sampleBookings[4], sampleBookings[5]])
  })

  it('should not have bookings if customer has no previous reservations', () => {
    expect(customer3.getAllBookings(sampleBookings)).to.deep.equal([])
    expect(customer4.getAllBookings(sampleBookings)).to.deep.equal([])
  })

  it('should have a method to filter customer bookings by past and upcoming', () => {
    expect(customer1.getBookingsByType(sampleBookings, currDate, 'past')).to.deep.equal([sampleBookings[0], sampleBookings[1], sampleBookings[2]])
    expect(customer1.getBookingsByType(sampleBookings, currDate, 'upcoming')).to.deep.equal([])
    expect(customer2.getBookingsByType(sampleBookings, currDate, 'past')).to.deep.equal([sampleBookings[3], sampleBookings[4]])
    expect(customer2.getBookingsByType(sampleBookings, currDate, 'upcoming')).to.deep.equal([sampleBookings[5]])
  })

  it('should return empty array if customer has no past or upcoming bookings', () => {
    expect(customer3.getBookingsByType(sampleBookings, currDate, 'past')).to.deep.equal([])
    expect(customer3.getBookingsByType(sampleBookings, currDate, 'upcoming')).to.deep.equal([])
    expect(customer4.getBookingsByType(sampleBookings, currDate, 'past')).to.deep.equal([])
    expect(customer4.getBookingsByType(sampleBookings, currDate, 'upcoming')).to.deep.equal([])
  })

  it('should have a method to calculate the total cost of all customer bookings', () => {
    expect(customer1.getTotalCost(sampleBookings, sampleRooms)).to.equal(801.92)
    expect(customer2.getTotalCost(sampleBookings, sampleRooms)).to.equal(1088.55)
  })

  it('should return no cost if customer does not have any bookings yet', () => {
    expect(customer3.getTotalCost(sampleBookings, sampleRooms)).to.equal(0)
    expect(customer4.getTotalCost(sampleBookings, sampleRooms)).to.equal(0)
  })
})