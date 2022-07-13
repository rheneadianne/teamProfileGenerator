const Employee = require('./employee.js')

class Manager extends Employee {
    constructor (name, id, email, officeNum) {
        super (name, id, email)
        this.officeNum = officeNum
    }

    employeeOfficeNum() {
        return this.officeNum
    }

    employeeRole() {
        return 'Manager'
    }
}

module.exports = Manager