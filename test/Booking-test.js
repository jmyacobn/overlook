import { expect } from 'chai'
import Booking from '../src/classes/Booking'
import { sampleBookings } from '../src/sample-data'

describe('Booking', () => {
  sampleBookings
  let booking1, booking2

  beforeEach(() => {
    booking1 = new Booking(sampleBookings[0])
    booking2 = new Booking(sampleBookings[3])
  })

  it('should be a function', () => {
    expect(Booking).to.be.a('function')
  })

  it('should have property of id', () => {
    expect(booking1.bookingID).to.equal('5fwrgu4i7k55hl76z')
    expect(booking2.bookingID).to.equal('5fwrgu4i7k55hl70e')
  })

  it('should have property of user id', () => {
    expect(booking1.userID).to.equal(1)
    expect(booking2.userID).to.equal(2)
  })

  it('should have property of date', () => {
    expect(booking1.date).to.equal('2022/02/15')
    expect(booking2.date).to.equal('2022/01/20')
  })

  it('should have property of roomNumber', () => {
    expect(booking1.roomNumber).to.equal(4)
    expect(booking2.roomNumber).to.equal(3)
  })
})