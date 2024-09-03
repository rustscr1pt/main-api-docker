use std::fmt::Display;
use std::sync::Arc;
use mysql::PooledConn;
use mysql::prelude::Queryable;
use rustelebot::types::{BotInstance};
use tokio::sync::{Mutex};
use crate::routers::tg_notification_routes::new_order_walgreen::format_new_order_message_walgreen::format_new_order_message_walgreen;
use crate::structs::structs::BasicPartGetAll;
use crate::walgreen_bot_server::bot_send_message_async::bot_send_message_async;
pub async fn get_last_record_sql_walgreen(connection : Arc<Mutex<PooledConn>>, bot : Arc<Mutex<BotInstance>>) -> mysql::Result<(), String> {
    let mut unlocked = connection.lock().await;
    match unlocked.query_map(String::from("SELECT id, request_status, customer_name, customer_email, customer_self_description, date_time_added FROM `walgreen_customers_request` WHERE id=(SELECT MAX(id) FROM `walgreen_customers_request`)"),
                               |(id, request_status, customer_name, customer_email, customer_self_description, date_time_added)| {
                             BasicPartGetAll {
                                 id,
                                 request_status,
                                 customer_name,
                                 customer_email,
                                 customer_self_description,
                                 date_time_added,
                             }
                         }
    ) {
        Ok(value) => {
            match value.get(0) {
                None => {
                    return Err(String::from("Error when trying to get the last element from messages array"))
                }
                Some(object) => {
                    println!("{:?}", object);
                    match bot_send_message_async(Arc::clone(&bot), format_new_order_message_walgreen(object)).await {
                        Ok(_) => {
                            return Ok(())
                        }
                        Err(e) => {
                            return Err(e.to_string())
                        }
                    }
                }
            }
        },
        Err(e) => {
            return Err(e.to_string())
        }
    }
}

