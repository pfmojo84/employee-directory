const inquirer = require ('inquirer');
const mysql = require ('mysql');
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

async function viewDepartments() {
    try {
      const departments = await db.getAllDepartments();
      console.table(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
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
      const employees = await db.getAllEmployees();
      console.table(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    displayMenu(); 
}

async function addDepartment() {
  const answer = await inquirer.prompt([
      {
          type: 'input',
          name: 'name',
          message: 'Enter the department name:'
      }
  ]);

  try {
    const newDept = await db.addDepartment(answer.name);
    console.log('Department added successfully:', newDept);
  } catch (error) {
    console.error('Error adding a new department:', error);
  }
  displayMenu(); 
}

async function addRole() {
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
    const newRole = await db.addRole(answer.title, answer.salary, answer.department_id);
    console.log('Role added successfully:', newRole);
  } catch (error) {
    console.error('Error adding a new role:', error);
  }
  displayMenu(); 
}

async function addEmployee() {
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
    const newEmployee = await db.addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id);
    console.log('Employee added successfully:', newEmployee);
  } catch (error) {
    console.error('Error adding a new employee:', error);
  }
  displayMenu(); 
}

async function updateEmployeeRole() {
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
    const updatedEmployee = await db.updateEmployeeRole(answer.employee_id, answer.role_id);
    console.log('Employee role updated successfully:', updatedEmployee);
  } catch (error) {
    console.error('Error updating employee role:', error);
  }
  displayMenu(); 
}

displayMenu();