const createManagerCard = manager => {
    return `
<ul>
<li>${manager.name}</li>
<li>${manager.id}</li>
<li>${manager.email}</li>
<li>${manager.officeNum}</li>
</ul>
`
}

const createEngineerCard = employee => {
    return `
<ul>
<li>${employee.name}</li>
<li>${employee.id}</li>
<li>${employee.email}</li>
<li>${employee.git}</li>
</ul>
`
}

const createInternCard = employee => {
    return `
<ul>
<li>${employee.name}</li>
<li>${employee.id}</li>
<li>${employee.email}</li>
<li>${employee.school}</li>
</ul>
`
}

let cardArray = []
const generateHTML = team => {
    
    for (i = 0; i < team.length; i++) {
        const employee = team[i]
        let role = employee.employeeRole()

        if (role === "Manager") {
            let managerCard = createManagerCard(employee);
            cardArray.push(managerCard)
        } else if (role === "Engineer") {
            let engineerCard = createEngineerCard(employee);
            cardArray.push(engineerCard)
        } else {
            let internCard = createInternCard(employee);
            cardArray.push(internCard)
        }
    }

    return cardArray.join('')

}


module.exports = generateHTML