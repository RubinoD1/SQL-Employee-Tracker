DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;

CREATE TABLE role (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER
);



CREATE TABLE employee (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);