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

