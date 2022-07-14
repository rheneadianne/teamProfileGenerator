const createManagerCard = manager => {
    return `<article class="card">
    <div class="card-body p-2 text-center">
        <div class="list-group ">
            <div class="list-group-item list-group-item-primary h5"><i class="bi bi-briefcase-fill"></i> Manager</div>
            <div class="list-group-item"><b>Name:</b> ${manager.name}</div>
            <div class="list-group-item"><b>Employee ID:</b> ${manager.id}</div>
            <div class="list-group-item "><b>Email:</b> <a href="mailto:${manager.email}">${manager.email}</a></div>
            <div class="list-group-item"><b>Office Number:</b> ${manager.officeNum}</div>
        </div>
    </div>
</article>
`
}

const createEngineerCard = employee => {
    return `<article class="card">
    <div class="card-body p-2 text-center">
        <div class="list-group ">
            <div class="list-group-item list-group-item-info h5"><i class="bi bi-code-slash"></i> Engineer</div>
            <div class="list-group-item"><b>Name:</b> ${employee.name}</div>
            <div class="list-group-item"><b>Employee ID:</b> ${employee.id}</div>
            <div class="list-group-item "><b>Email:</b> <a href="mailto:${employee.email}">${employee.email}</a></div>
            <div class="list-group-item"><b>Github:</b> <a href="https://github.com/${employee.git}" target="_blank">${employee.git}</a></div>
        </div>
    </div>
</article>
`
}

const createInternCard = employee => {
    return `<article class="card">
    <div class="card-body p-2 text-center">
        <div class="list-group ">
            <div class="list-group-item list-group-item-success h5"><i class="bi bi-person-bounding-box"></i> Intern</div>
            <div class="list-group-item"><b>Name:</b> ${employee.name}</div>
            <div class="list-group-item"><b>Employee ID:</b> ${employee.id}</div>
            <div class="list-group-item "><b>Email:</b> <a href="mailto:${employee.email}">${employee.email}</a></div>
            <div class="list-group-item"><b>School:</b> ${employee.School}</div>
        </div>
    </div>
</article>
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
    let cardString = cardArray.join('')
    return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
        <title>Meet the Team</title>
    </head>
    <body class="bg-dark">
    
    <header class="jumbotron text-muted d-flex justify-content-center">
        <h1 class="display-3">Meet the Team</h1>
    </header>
    <section class="container card-columns d-flex justify-content-center">
    ${cardString}
    </section>
</body>
</html>`
}


module.exports = generateHTML