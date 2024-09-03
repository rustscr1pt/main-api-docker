use std::sync::{Arc};
use axum::{Extension, Router};
use axum::routing::post;
use mysql::PooledConn;
use rustelebot::types::BotInstance;
use tokio::sync::Mutex;
use crate::routers::tg_notification_routes::new_note_ugo::new_note_ugo::new_note_ugo;
use crate::routers::tg_notification_routes::new_note_walgreen::new_note_walgreen::new_note_walgreen;
use crate::routers::tg_notification_routes::new_order_ugo::new_order_ugo::new_order_ugo;
use crate::routers::tg_notification_routes::new_order_walgreen::new_order_walgreen::new_order_walgreen;
use crate::routers::tg_notification_routes::new_status_ugo::new_status_ugo::new_status_ugo;
use crate::routers::tg_notification_routes::new_status_walgreen::new_status_walgreen::new_status_walgreen;
use crate::structs::extension_structs::SQLAndTelegramWebExtension;

pub fn tg_notification_routes(arc_sql : Arc<Mutex<PooledConn>>, bot : Arc<Mutex<BotInstance>>) -> Router {
    return
        Router::new()
            .route("/telegram/new_order/walgreen", post(new_order_walgreen))
                .layer(Extension(SQLAndTelegramWebExtension {
                    arc_sql : Arc::clone(&arc_sql),
                    telegram_bot : Arc::clone(&bot)
                }))
            .route("/telegram/new_order/ugo", post(new_order_ugo))
                .layer(Extension(SQLAndTelegramWebExtension {
                    arc_sql : Arc::clone(&arc_sql),
                    telegram_bot : Arc::clone(&bot)
                }))
            .route("/telegram/new_note/walgreen", post(new_note_walgreen))
                .layer(Extension(SQLAndTelegramWebExtension {
                    arc_sql : Arc::clone(&arc_sql),
                    telegram_bot : Arc::clone(&bot)
                }))
            .route("/telegram/new_note/ugo", post(new_note_ugo))
                .layer(Extension(SQLAndTelegramWebExtension {
                    arc_sql : Arc::clone(&arc_sql),
                    telegram_bot : Arc::clone(&bot)
                }))
            .route("/telegram/new_status/walgreen", post(new_status_walgreen))
                .layer(Extension(SQLAndTelegramWebExtension {
                    arc_sql : Arc::clone(&arc_sql),
                    telegram_bot : Arc::clone(&bot)
                }))
            .route("/telegram/new_status/ugo", post(new_status_ugo))
                .layer(Extension(SQLAndTelegramWebExtension {
                    arc_sql : Arc::clone(&arc_sql),
                    telegram_bot : Arc::clone(&bot)
                }))

}