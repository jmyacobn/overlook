import {expect} from 'chai'
import Customer from '../src/classes/Customer'
import {sampleCustomers, sampleRooms, sampleBookings} from '../src/sample-data'

describe('Customer', () => {
    sampleCustomers
    sampleRooms
    sampleBookings
    let customer1, customer2

    beforeEach(() => {
        customer1 = new Customer(sampleCustomers[0])
        customer2 = new Customer(sampleCustomers[1])
    })

    it('should be a function', () => {
        expect(Customer).to.be.a('function')
    })

    it('should have property of id', () => {
        expect(customer1.id).to.equal(1)
        expect(customer2.id).to.equal(2)
    })

    it('should have property of name', () => {
        expect(customer1.name).to.equal('Leatha Ullrich')
        expect(customer2.name).to.equal('Rocio Schuster')
    })

    it('should have method to get all customer bookings', () => {
        expect(customer1.getAllBookings(sampleBookings)).to.deep.equal([sampleBookings[0], sampleBookings[1], sampleBookings[2]])
        expect(customer2.getAllBookings(sampleBookings)).to.deep.equal([sampleBookings[3], sampleBookings[4], sampleBookings[5]])
    })

    it('should have a method to calculate the total cost of all customer bookings', () => {
        expect(customer1.getTotalCost(sampleBookings, sampleRooms)).to.equal(801.92)
        expect(customer2.getTotalCost(sampleBookings, sampleRooms)).to.equal(1088.55)
    })
})