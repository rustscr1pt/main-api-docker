use std::fmt::Display;
use std::sync::Arc;
use mysql::PooledConn;
use mysql::prelude::Queryable;
use rustelebot::types::BotInstance;
use tokio::sync::{Mutex};
use crate::routers::tg_notification_routes::new_note_ugo::format_new_note_message_ugo::format_new_note_message_ugo;
use crate::structs::structs::NoteObjectNotationFull;
use crate::walgreen_bot_server::bot_send_message_async::bot_send_message_async;

pub async fn get_last_note_sql_ugo(connection : Arc<Mutex<PooledConn>>, bot : Arc<Mutex<BotInstance>>) -> mysql::Result<(), String> {
    let mut  unlocked = connection.lock().await;
    match unlocked.query_map(String::from("SELECT id, related_id, text_info, date_time FROM `order_notes` WHERE id=(SELECT MAX(id) FROM `order_notes`)"),
                               |(id, related_id, text_info, date_time)| {
                                   NoteObjectNotationFull {
                                       id,
                                       related_id,
                                       text_info,
                                       date_time
                                   }
                               }
    ) {
        Ok(value) => {
            println!("{:?}", value);
            match value.get(0) {
                None => {
                    return Err(String::from("Error when trying to get the last element from messages array"))
                }
                Some(object) => {
                    println!("{:?}", object);
                    match bot_send_message_async(Arc::clone(&bot), format_new_note_message_ugo(object)).await {
                        Ok(_) => {return Ok(())}
                        Err(err) => {
                            return Err(err.to_string())
                        }
                    }
                }
            }
        }
        Err(e) => {
            return Err(e.to_string())
        }
    }
}