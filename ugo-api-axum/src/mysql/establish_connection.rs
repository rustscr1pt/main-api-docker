use mysql::{Pool, PooledConn};
use crate::structs::constants::{FILE_LOCATION, read_mysql_configuration_json};

// Establish connection with the db at the start of execution.

pub fn establish_connection() -> PooledConn { // First action to check the connection and establish a working pool
    let pool =
        Pool::new(
            read_mysql_configuration_json(FILE_LOCATION())
                .expect("Couldn't read_mysql_configuration_json")
                .as_str()
        )
            .expect("Couldn't connect to a base");
    println!("Connection with MySQL pool is established!");
    return pool.get_conn().unwrap();
}