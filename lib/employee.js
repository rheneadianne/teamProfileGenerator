class Employee {
    constructor(name, id, email) { // employee constructor
        this.name = name;
        this.id = id;
        this.email = email
    }

    employeeName() { // returns name from user input
        return this.name
    }

    employeeID() { // returns ID from user input
        return this.id
    }

    employeeEmail() {
        return this.email // returns email from user input
    }

    employeeRole() { // returns as generic Employee
        return 'Employee'
    }
}

module.exports = Employee