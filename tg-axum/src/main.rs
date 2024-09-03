use std::fmt::Display;
use std::future::Future;
use std::sync::Arc;
use axum::{Router};
use rustelebot::types::BotInstance;
use tokio::sync::{Mutex};
use crate::bind_and_serve::bindings::tokio_bindings;
use crate::generic_replies::generic_replies::reject_unmatched_connection;
use crate::mysql::establish_connection::establish_connection;
use crate::mysql::refresh_pool_connection::refresh_pool_connection;
use crate::routers::tg_notification_routes::tg_notification_routes::tg_notification_routes;
use crate::structs::cors_layer::get_cors_layer;
use crate::walgreen_bot_server::bot_initializer::bot_initializer;

mod mysql;
mod structs;
mod routers;
mod generic_replies;
mod bind_and_serve;
mod walgreen_bot_server;

#[tokio::main]
async fn main() {
    let arc_sql = Arc::new(Mutex::new(establish_connection())); // create a shared instance of connection
    let telegram_bot : Arc<Mutex<BotInstance>> = Arc::new(Mutex::new(bot_initializer())); // Arc is holding an active instance of telegram bot for sending notifications

    refresh_pool_connection(Arc::clone(&arc_sql)); // spawn a refresher for MySQL connection

    let app = Router::new()
        .merge(tg_notification_routes(Arc::clone(&arc_sql), Arc::clone(&telegram_bot)))
        .fallback(reject_unmatched_connection) // If no matches in merged => reject connection
        .layer(get_cors_layer()); // Set up allowed methods + allowed-origins

    match tokio_bindings().await {
        Ok(addr) => {
            match axum::serve(addr, app).await {
                Ok(()) => {}
                Err(e) => {
                    println!("Error when trying to serve.\n{}", e);
                }
            }
        },
        Err(e) => {
            println!("Error when trying to bind.\n{}", e);
        }
    }
}
