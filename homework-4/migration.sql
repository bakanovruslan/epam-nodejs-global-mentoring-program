create type permission as enum ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'); 
 
CREATE TABLE groups( 
    id int PRIMARY KEY, 
    name varchar(255), 
    permissions permission[] 
); 
 
CREATE TABLE user_group (
    user_id int,
    group_id int,
    CONSTRAINT fk_user 
        FOREIGN KEY(user_id) 
            REFERENCES users(id) 
                ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_group 
        FOREIGN KEY(group_id) 
            REFERENCES groups(id) 
                ON UPDATE CASCADE ON DELETE CASCADE
);