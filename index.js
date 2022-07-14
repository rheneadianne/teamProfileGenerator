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
let team =[]
const addManager = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'managerName',
                message: "What is the team Manager's name?",
                validate: validation
            },
            {
                type: 'input',
                name: 'managerID',
                message: "What is the team Manager's employee ID?",
                validate: validation
            },
            {
                type: 'input',
                name: 'managerEmail',
                message: "What is the team Manager's email?",
                validate: validation
            },
            {
                type: 'input',
                name: 'managerNum',
                message: "What is the team Manager's office number? If they have an extension, please enter as ext. XXX after the phone num. ",
                validate: validation
            }
        ])
        .then(employeeData => {
            const { managerName, managerID, managerEmail, managerNum } = employeeData
            const manager = new Manager(managerName, managerID, managerEmail, managerNum)
            console.log(manager.employeeRole())
            team.push(manager)
        }
        )
}

const addEmployee = async () => {
    const questions = [
        {
            type: 'list',
            name: 'employeeRole',
            message: "Please select the role of the Employee you would like to add.",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'employeeName',
            message: "What is the Employee's name?",
            validate: validation
        },
        {
            type: 'input',
            name: 'employeeID',
            message: "What is theEmployee's ID?",
            validate: validation
        },
        {
            type: 'input',
            name: 'employeeEmail',
            message: "What is the Employee's email?",
            validate: validation
        },
        {
            type: 'input',
            name: 'employeeGit',
            message: "What is the Employee's GitHub?",
            when: input => input.employeeRole === "Engineer",
            validate: validation
        },
        {
            type: 'input',
            name: 'employeeSchool',
            message: "What school is the employee currently attending?",
            when: input => input.employeeRole === "Intern",
            validate: validation
        },
        {
            type: 'confirm',
            name: 'addMore',
            message: "Do you have more employees to add?",
            default: true
        }
    ];
    
    const { addMore, ...answers} = await inquirer.prompt(questions)
    
    if (answers.employeeRole === 'Engineer') {
        const {employeeName, employeeID, employeeEmail, employeeGit} = answers
        const engineer = new Engineer (employeeName, employeeID, employeeEmail, employeeGit)
        team.push(engineer)
    } else {
        const {employeeName, employeeID, employeeEmail, employeeSchool} = answers
        const intern = new Intern (employeeName, employeeID, employeeEmail, employeeSchool)
        team.push(intern)
    }
    
    return addMore ? addEmployee(team): team
}

let dataHTML = []

const htmlData = async () => {
    const inputs = await addEmployee();
    return dataHTML = inputs
}


addManager()
    .then(htmlData)
    .then(data => { //creates a new file in dist folder called index.js
        data = dataHTML
        return fs.writeFileSync(path.join(process.cwd(), "/dist/index.html"), generateHTML(data));
    })