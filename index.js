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

let emailValidation = response => {
    if(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(response) === false) {
        console.log(" <---- is an invalid email! Please to enter the email in this format: example@domain.com")
        return false
    } else {
        return true
    }
}

let numberValidation = response => {
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
                validate: emailValidation
            },
            {
                type: 'input',
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
            validate: emailValidation
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
    .then(data => { //creates a new file in dist folder called index.html
        data = dataHTML
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