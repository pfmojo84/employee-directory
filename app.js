const inquirer = require ('inquirer');
const { DB } = require('./db/db');

const db = new DB();

const menuOptions = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee Role',
    'Exit'
];

//displayMenu function uses inquirer to prompt users to view tables, add info to tables, or update an employee
function displayMenu() {
    inquirer
      .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Choose an Option:',
            choices: menuOptions
        }
      ]) 
      //switch statement calls function from db.js based on user selection 
      .then((answers) => {
        switch (answers.choice) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                exitApp();
                break;
            default:
                console.log('Invalid Selection');
                displayMenu();
        }
      })
}
//display all deparments in table format - async and await handles asynchronous fetch of departments from database 
async function viewDepartments() {
    try {
      const departments = await db.getAllDepartments();
      console.table(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
    //display main menu again after departments are fetched and logged as a table
    displayMenu(); 
}

async function viewRoles() {
    try {
      const roles = await db.getAllRoles();
      console.table(roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
    displayMenu(); 
}

async function viewEmployees() {
  try {
      //fetch all employees with details from the database
      const employees = await db.getAllEmployeesWithDetails();
      //formats the fetched employees data for display
      const formattedEmployees = employees.map(employee => ({
          ID: employee.id,
          First_Name: employee.first_name,
          Last_Name: employee.last_name,
          Title: employee.title,
          Department: employee.department,
          Salary: employee.salary,
          Manager: employee.manager
      }));
      //display formatted employees in table
      console.table(formattedEmployees);
  } catch (error) {
      console.error('Error fetching employees:', error);
  }
  displayMenu();
}

async function addDepartment() {
  //prompt user to enter new department name
  const answer = await inquirer.prompt([
      {
          type: 'input',
          name: 'name',
          message: 'Enter the department name:'
      }
  ]);

  try {
  //add the department to the department table in database based on user input  
    const newDept = await db.addDepartment(answer.name);
    console.log('Department added successfully:', newDept);
  } catch (error) {
    console.error('Error adding a new department:', error);
  }
  displayMenu(); 
}

async function addRole() {
  //prompt user to enter details for new role
  const answer = await inquirer.prompt([
      {
          type: 'input',
          name: 'title',
          message: 'Enter the role title:'
      },
      {
          type: 'input',
          name: 'salary',
          message: 'Enter the role salary:'
      },
      {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID:'
      }
  ]);

  try {
    //add new role to corresponding table in employees_db
    const newRole = await db.addRole(answer.title, answer.salary, answer.department_id);
    console.log('Role added successfully:', newRole);
  } catch (error) {
    console.error('Error adding a new role:', error);
  }
  displayMenu(); 
}

async function addEmployee() {
  //prompt user to input details for new employee
  const answer = await inquirer.prompt([
      {
          type: 'input',
          name: 'first_name',
          message: 'Enter the employee first name:'
      },
      {
          type: 'input',
          name: 'last_name',
          message: 'Enter the employee last name:'
      },
      {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID:'
      },
      {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager ID:'
      }
  ]);

  try {
    //update employee table with new employee info in employees_db
    const newEmployee = await db.addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
    console.log('Employee added successfully:', newEmployee);
  } catch (error) {
    console.error('Error adding a new employee:', error);
  }
  displayMenu(); 
}

async function updateEmployeeRole() {
  //prompt user to input updated details for an employees role based on their id number and role id number
  const answer = await inquirer.prompt([
      {
          type: 'input',
          name: 'employee_id',
          message: 'Enter the employee ID to update:'
      },
      {
          type: 'input',
          name: 'role_id',
          message: 'Enter the new role ID:'
      }
  ]);

  try {
    //change the corresponding information within the employee table in employees_db
    const updatedEmployee = await db.updateEmployeeRole(answer.employee_id, answer.role_id);
    console.log('Employee role updated successfully:', updatedEmployee);
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
  displayMenu(); 
}

function exitApp() {
  console.log('Exiting the application.');
  process.exit();
}

displayMenu();