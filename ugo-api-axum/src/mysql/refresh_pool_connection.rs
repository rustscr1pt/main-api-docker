use std::sync::Arc;
use tokio::sync::Mutex;
use mysql::{Pool, PooledConn};
use tokio::time::{sleep, Duration};
use crate::structs::constants::{FILE_LOCATION, read_mysql_configuration_json};
use chrono::Local;

pub fn refresh_pool_connection(to_refresh: Arc<Mutex<PooledConn>>) {
    tokio::spawn(async move {
        let mut timer = 60;

        loop {
            if timer == 0 {
                match refresh_connection(&to_refresh).await {
                    Ok(_) => {
                        println!(
                            "[{}] MySQL connection refreshed successfully.",
                            Local::now().format("%Y-%m-%d %H:%M:%S")
                        );
                        timer = 60; // Reset the timer on success
                    }
                    Err(e) => {
                        println!(
                            "[{}] Failed to refresh MySQL connection: {:?}",
                            Local::now().format("%Y-%m-%d %H:%M:%S"),
                            e
                        );
                        timer = 10; // Retry sooner in case of failure
                    }
                }
            } else {
                println!(
                    "[{}] {} seconds estimated till MySQL connection is refreshed.",
                    Local::now().format("%Y-%m-%d %H:%M:%S"),
                    timer
                );
                sleep(Duration::from_secs(1)).await;
                timer -= 1;
            }
        }
    });
}

async fn refresh_connection(to_refresh: &Arc<Mutex<PooledConn>>) -> Result<(), Box<dyn std::error::Error>> {
    let config_str = read_mysql_configuration_json(FILE_LOCATION())
        .map_err(|e| format!("Failed to read MySQL configuration: {:?}", e))?;

    let pool = Pool::new(config_str.as_str())
        .map_err(|e| format!("Failed to create MySQL pool: {:?}", e))?;

    let mut lock = to_refresh.lock().await;
    *lock = pool.get_conn()
        .map_err(|e| format!("Failed to get a connection from the pool: {:?}", e))?;

    Ok(())
}