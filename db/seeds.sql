DO $$
    DECLARE
      -- Any variable declarations would go here
    BEGIN
      -- Begin transaction


INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');


INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John' , 'Doe', 1, null),
       ('Mike' , 'Chan', 2, 1),
       ('Ashley' , 'Rodriguez', 3, null),
       ('Kevin' , 'Tupik', 4, 3),
       ('Kunal' , 'Singh', 5, null),
       ('Malia' , 'Brown', 6, 5),
       ('Sarah' , 'Lourd', 7, null),
       ('Tom' , 'Allen', 8, 7);

    -- If the code reaches here, it means no exceptions were raised.
    -- Thus, it will commit automatically at the end of the block.
RAISE NOTICE 'Transaction Complete';

EXCEPTION 
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occurred: %', SQLERRM; -- Log the error
        ROLLBACK; -- Explicitly roll back changes in case of error
END $$;