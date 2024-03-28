const mysql = require('mysql2');
require("dotenv").config()
// Create a connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'employees_db'
});

// Define a class for database operations
class DB {
  constructor() {
    this.connection = connection;
  }

  // Function to fetch all departments from the database
  getAllDepartments() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM department';
      this.connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Function to fetch all roles from the database
  getAllRoles() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM roles';
      this.connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  //function to fetch table with all employess and employee details
  getAllEmployeesWithDetails() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                employee.id,
                employee.first_name,
                employee.last_name,
                roles.title,
                department.name AS department,
                roles.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM 
                employee
            INNER JOIN 
                roles ON employee.role_id = roles.id
            INNER JOIN 
                department ON roles.department_id = department.id
            LEFT JOIN 
                employee AS manager ON employee.manager_id = manager.id
        `;
        this.connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

  // Function to add a department to the database
  addDepartment(name) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      this.connection.query(query, [name], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Function to add a role to the database
  addRole(title, salary, department_id) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
      this.connection.query(query, [title, salary, department_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Function to add an employee to the database
  addEmployee(first_name, last_name, role_id, manager_id) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      this.connection.query(query, [first_name, last_name, role_id, manager_id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Function to update an employee's role in the database
  updateEmployeeRole(employeeId, roleId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
      this.connection.query(query, [roleId, employeeId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  
}

module.exports = { DB };
