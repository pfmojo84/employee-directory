const mysql = require('mysql');

// Create a connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Otis2024!',
  database: 'employee_tracker'
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
      const query = 'SELECT * FROM role';
      this.connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Function to fetch all employees from the database
  getAllEmployees() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM employee';
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
      const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
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
