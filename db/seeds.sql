INSERT INTO department (name)
VALUES
('Sales'),
('Finance'),
('Legal'),
('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Account Manger', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3),
('Lead Engineer', 150000, 4),
('Software Engineer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Daniel', 'Rubino', 1, null),
('Diane', 'Winters', 2, 11),
('Bob', 'Builder', 3, null),
('John', 'Doe', 4, 22);
