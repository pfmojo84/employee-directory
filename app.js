const inquirer = require ('inquirer');
const mysql = require ('mysql2');
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
            case 'Add a Deparment':
                addDept();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployee();
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

async function addDept() {
    try {
      const newDept = await db.addDepatment();
      console.table(newDept);
    } catch (error) {
      console.error('Error adding a new department', error);
    }
    displayMenu(); 
}

async function addRole() {
    try {
      const newRole = await db.addRole();
      console.table(newRole);
    } catch (error) {
      console.error('Error adding a new role', error);
    }
    displayMenu(); 
}

async function addEmployee() {
    try {
      const newEmployee = await db.addEmployee();
      console.table(newEmployee);
    } catch (error) {
      console.error('Error adding a new employee', error);
    }
    displayMenu(); 
}

async function updateEmployee() {
    try {
      const updateEmp = await db.updateEmployee();
      console.table(updateEmp);
    } catch (error) {
      console.error('Error adding a new employee', error);
    }
    displayMenu(); 
}

displayMenu();