const Employee = require('./employee.js')

class Engineer extends Employee {
    constructor (name, id, email, git) {
        super (name, id, email)
        this.git = git
    }

    employeeGit() {
        return this.git
    }

    employeeRole() {
        return 'Engineer'
    }
}

module.exports = Engineer