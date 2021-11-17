create type permission as enum ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

CREATE TABLE groups(
    id int PRIMARY KEY,
    name varchar(255),
    permissions permission[]
);

CREATE TABLE user_group (
    user_id int,
    group_id int
);