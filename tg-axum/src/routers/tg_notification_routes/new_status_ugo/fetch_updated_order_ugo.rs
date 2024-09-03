use std::fmt::Display;
use std::sync::Arc;
use mysql::PooledConn;
use mysql::prelude::Queryable;
use rustelebot::types::BotInstance;
use tokio::sync::Mutex;
use crate::routers::tg_notification_routes::new_status_ugo::bot_message_formatter_ugo::bot_message_formatter_ugo;
use crate::structs::structs::BasicPartGetAll;
use crate::walgreen_bot_server::bot_send_message_async::bot_send_message_async;

pub async fn fetch_updated_order_ugo(connection : Arc<Mutex<PooledConn>>, bot : Arc<Mutex<BotInstance>>, id: u32, new_status : String) -> mysql::Result<(), String> {
    let mut unlocked = connection.lock().await;
    match unlocked.query_map(format!("SELECT id, request_status, customer_name, customer_email, customer_self_description, date_time_added FROM `ugo_customers_request` WHERE id={}", id),
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
                    return Err("Couldn't extract first value from SQL query".to_string())
                }
                Some(order) => {
                    match bot_send_message_async(Arc::clone(&bot), bot_message_formatter_ugo(order, new_status)).await {
                        Ok(()) => {return  Ok(())}
                        Err(err) => {return Err(err.to_string())}
                    }
                }
            }
        }
        Err(err) => {
            return Err(err.to_string())
        }
    }
}