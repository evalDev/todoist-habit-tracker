// Javascript
var habitTracker = new Vue({
  el: '#habitTracker',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    generateDateRange: function (startingDate) {
      // check if arg undefedined and sets default date of today(-6 days)
      startingDate = startingDate || moment().startOf('date').subtract(6, 'd')

      // Returns array of 7 moment objects increase days by 1
      return new Array(7).fill(1)
        .map((c, i) => moment(startingDate)
          .add(i, 'd').startOf('date'))
    }

  }
})

// Tests

describe('Habit Tracker', () => {
  describe('generateDateRange', () => {
    let gdr
    beforeEach(() => {
      gdr = habitTracker.generateDateRange()
    })
    it('generates an array', () => {
      expect(Array.isArray(gdr)).toBe(true)
    })
    it('generates an array with 7 items', () => {
      expect(gdr.length).toBe(7)
    })
    it('generates a array that is not empty', () => {
      expect(Object.keys(gdr).length).toBeGreaterThan(0)
    })
    it('should return an array of moment(date) objects', () => {
      expect(gdr.every(date => date._isAMomentObject)).toBe(true)
    })
    it('should have today\'s date as the last item in the array', () => {
      const lastDate = gdr.slice(-1)[0]
      expect(lastDate.startOf('date').format()).toBe(moment().startOf('date').format())
    })
    it('should have a that is 6 days prior to today as the first item in the array', () => {
      const firstDate = gdr.slice(0)[0]
      const sixDaysPriortoToday = moment().subtract(6, 'days').startOf('date').format()
      expect(firstDate.format()).toBe(sixDaysPriortoToday)
    })
    it('should return an array where each item is +1 day', () => {
      // checks date incremented by one day if false returns 0
      const checkIncrementedOneDay = gdr.reduce((previous, date) => {
        if (previous === 0) { return 0 }
        return previous.add(1, 'd').format() === date.format() ? date : 0
      })
      expect(checkIncrementedOneDay._isAMomentObject).toBe(true)
    })
    describe('args', () => {
      it('should accept a moment() as an argument', () => {
        expect(habitTracker.generateDateRange(moment())).not.toBe(undefined)
      })
      it('should set the moment to the first item of the array', () => {
        gdr = habitTracker.generateDateRange(moment())
        expect(gdr[0].format()).toBe(moment().startOf('date').format())
      })
    })
  })
})
