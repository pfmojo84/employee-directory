INSERT INTO department (name)
VALUES ("Finance"),
       ("Legal"),
       ("Human Resources"),
       ("Engineering"),
       ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES ("Finance Administrator", 85000, 1),
       ("Budget Consultant", 60000, 1),
       ("Senior Legal Counsel", 110000, 2),
       ("Associate Attorney", 80000, 2),
       ("HR Generalist", 75000, 3),
       ("Recruitment Coordinator", 45000, 3),
       ("Principal Engineer", 125000, 4),
       ("Associate Engineer", 90000, 4),
       ("Development Specialist", 80000, 5),
       ("Account Executive", 75000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Eleanor", "Shellstrop", 1, NULL),
       ("Chidi", "Anagonye", 2, 1),
       ("Tahani", "Al-Jamil", 3, NULL),
       ("Jason", "Mendoza", 4, 3),
       ("April", "Ludgate", 5, NULL),
       ("Ron", "Swanson", 6, 5),
       ("Leslie", "Knope", 7, NULL),
       ("Andrew", "Dwyer", 8, 7),
       ("Michael", "Scott", 9, NULL),
       ("Jan", "Levenson", 10, 9);