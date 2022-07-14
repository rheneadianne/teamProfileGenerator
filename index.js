// all of the required modules
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const Engineer = require('./lib/engineer.js')
const Intern = require('./lib/intern.js')
const Manager = require('./lib/manager.js')
const generateHTML = require('./src/generateHTML.js')


let validation = response => { // validation checker to prevent blank responses
    if (!response) {
        console.log("Response cannot be left blank! Please try again")
        return false
    } else {
        return true
    }
}

let emailValidation = response => { // checks for proper email format
    if(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(response) === false) {
        console.log(" <---- is an invalid email! Please to enter the email in this format: example@domain.com")
        return false
    } else {
        return true
    }
}

let numberValidation = response => { // ensures there's at least 1 digit in there and that the string is at list 10 characters long like a phone number. Users can still add other characters like () - or letters for extra info
    if(/\d/.test(response) === false){
        console.log(" <---- does not contain any digits. Please enter a 10 digit number followed by the extension if necessary.") 
        return false
    } else if (response.length < 10) {
        console.log(" <---- was too short! Please enter a 10 number followed by the extension if necessary. ")
    } else if (/\d/.test(response) === false && response.length < 10) {
        console.log(" <---- does not contain any digits and is too short. Please enter a 10 digit number followed by the extension if necessary.") 
    } else {
        return true
    }
}

let team =[] // empty team array
const addManager = () => {
    return inquirer
        .prompt([
            {
                type: 'input', // asks managers name
                name: 'managerName',
                message: "What is the team Manager's name?",
                validate: validation
            },
            {
                type: 'input', // asks managers ID. string so people can enter any character if their ID isnt numerical
                name: 'managerID',
                message: "What is the team Manager's employee ID?",
                validate: validation
            },
            {
                type: 'input', // asks managers email
                name: 'managerEmail',
                message: "What is the team Manager's email?",
                validate: emailValidation
            },
            {
                type: 'input', // asks managers phone number
                name: 'managerNum',
                message: "What is the team Manager's office number? If they have an extension, please enter ext. [XYZ] after the phone number. ",
                validate: numberValidation
            }
        ])
        .then(employeeData => {
            const { managerName, managerID, managerEmail, managerNum } = employeeData
            const manager = new Manager(managerName, managerID, managerEmail, managerNum)
            team.push(manager)
        }
        )
}

const addEmployee = async () => {
    const questions = [
        {
            type: 'list', // select role of employee
            name: 'employeeRole',
            message: "Please select the role of the Employee you would like to add.",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input', // employee name
            name: 'employeeName',
            message: "What is the Employee's name?",
            validate: validation
        },
        {
            type: 'input', // employee ID
            name: 'employeeID',
            message: "What is theEmployee's ID?",
            validate: validation
        },
        {
            type: 'input',
            name: 'employeeEmail', // employee email
            message: "What is the Employee's email?",
            validate: emailValidation
        },
        {
            type: 'input',
            name: 'employeeGit', // engineer git
            message: "What is the Employee's GitHub?",
            when: input => input.employeeRole === "Engineer", // only shows up if Engineer role is selected
            validate: validation
        },
        {
            type: 'input',
            name: 'employeeSchool', // intern school
            message: "What school is the employee currently attending?", 
            when: input => input.employeeRole === "Intern", // only shows up if intern role is selected
            validate: validation
        },
        {
            type: 'confirm',
            name: 'addMore',
            message: "Do you have more employees to add?", // prompt to loop back to start
            default: true
        }
    ];
    
    const { addMore, ...answers} = await inquirer.prompt(questions) // async that waits for inquirer inputs.
    
    if (answers.employeeRole === 'Engineer') {
        const {employeeName, employeeID, employeeEmail, employeeGit} = answers
        const engineer = new Engineer (employeeName, employeeID, employeeEmail, employeeGit)
        team.push(engineer) // pushes created object to team array
    } else {
        const {employeeName, employeeID, employeeEmail, employeeSchool} = answers
        const intern = new Intern (employeeName, employeeID, employeeEmail, employeeSchool)
        team.push(intern) // pushes created object to team array
    }
    
    return addMore ? addEmployee(team): team
}

let dataHTML = []

const htmlData = async () => {
    const inputs = await addEmployee(); // waits for addEmployee to finish after all the loops
    return dataHTML = inputs // returns inputs
}


addManager()
    .then(htmlData)
    .then(data => { //creates a new file in dist folder called index.html
        data = dataHTML // uses inputs for HTML creation data in line 163
        console.log("Please see your new index.html file in the /dist/index.html folder")
        let dir = path.join(__dirname, 'dist')
        fs.mkdir(dir, (error) => {
            if(error){
              console.log('Folder found in directory. New folder not created.')
            } else {
              console.log('New folder has been created.')
            }
          })
        return fs.writeFileSync(path.join(process.cwd(), "/dist/index.html"), generateHTML(data));
        }
    )