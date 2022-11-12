import {expect} from 'chai'
import Room from '../src/classes/Room'
import {sampleRooms} from '../src/sample-data'

describe('Room', () => {
    sampleRooms
    let room1, room2

    beforeEach(() => {
        room1 = new Room(sampleRooms[0])
        room2 = new Room(sampleRooms[3])
    })

    it('should be a function', () => {
        expect(Room).to.be.a('function')
    })

    it('should have property of room number', () => {
        expect(room1.roomNumber).to.equal(2)
        expect(room2.roomNumber).to.equal(6)
    })

    it('should have property of room type', () => {
        expect(room1.roomType).to.equal("suite")
        expect(room2.roomType).to.equal("junior suite")
    })

    it('should have property of bidet', () => {
        expect(room1.bidet).to.equal(false)
        expect(room2.bidet).to.equal(true)
    })

    it('should have property of bed size', () => {
        expect(room1.bedSize).to.equal("full")
        expect(room2.bedSize).to.equal("queen")
    })

    it('should have property of bed count', () => {
        expect(room1.bedCount).to.equal(2)
        expect(room2.bedCount).to.equal(1)
    })

    it('should have property of room cost', () => {
        expect(room1.roomCost).to.equal(477.38)
        expect(room2.roomCost).to.equal(397.02)
    })
})