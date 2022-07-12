const employee = require('./../lib/manager.js')

let newEmployee = new employee('Firsto Lasto', '6456-M', 'onmyknees@begging.com', '1800-are-you-slappin')

test('creates employee object from employee class based on user input', () => {
    // THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
    // THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
    // THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
 
    expect(newEmployee.name).toEqual(expect.any(String))
    expect(newEmployee.id).toEqual(expect.any(String))
    expect(newEmployee.email).toEqual(expect.any(String))
    expect(newEmployee.officeNum).toEqual(expect.any(String))
});

test('function gets employee name from created object', () => {
    expect(newEmployee.employeeOfficeNum()).toEqual(expect.any(String))
})

test('function gets employee role from created object', () => {
    expect(newEmployee.employeeRole()).toEqual('Manager')
})