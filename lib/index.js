const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('../db/connection')


function mainMenu() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View all Departments', 'Add Department', 'Quit']
        }).then(({ choice }) => {
            switch (choice) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View all Departments':
                    viewAllDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Quit':
                    console.log('exiting application...')
                    process.exit();

            }
        });
};

function viewAllEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, concat(m.first_name," ", m.last_name) manager
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON employee.manager_id = m.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log("Error when attempting to view all employees")
            return;
        }
        console.table(rows);
        mainMenu();
    });
};

function addEmployee() {};

function updateEmployeeRole() {};

function viewAllRoles()
{
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary 
                FROM role
                JOIN department ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) 
        {
          console.log("Error when attempting to view all roles")
          return;
        }
        console.table(rows);
        mainMenu();
    });
};

function addRole() {};

function viewAllDepartments()
{
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log("Error when attempting to view all departments");
            return;
        }
        console.table(rows);
        mainMenu();
    });
}

function addDepartment() {};

module.exports = { mainMenu }