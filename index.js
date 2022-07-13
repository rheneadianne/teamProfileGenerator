// all of the required modules
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const Engineer = require('./lib/engineer.js')
const Intern = require('./lib/intern.js')
const Manager = require('./lib/manager.js')

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
            team.push(manager)
        }
        )
}

const addEmployee = async (inputs = []) => {
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
    team.push(...inputs, answers)
    return addMore ? addEmployee(team): team
    
}

const plsWork = async () => {
    const inputs = await addEmployee();
    console.log(inputs)
}

addManager()
    .then(plsWork)