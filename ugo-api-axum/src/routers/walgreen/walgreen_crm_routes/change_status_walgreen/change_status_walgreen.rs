use std::sync::Arc;
use axum::{Extension, Json};
use axum::response::IntoResponse;
use mysql::PooledConn;
use reqwest::Error;
use tokio::sync::Mutex;
use crate::generic_replies::generic_replies::reply_with_message;
use crate::routers::walgreen::walgreen_crm_routes::change_status_walgreen::change_status_walgreen_sql::change_status_walgreen_sql;
use crate::routers::walgreen::walgreen_crm_routes::change_status_walgreen::new_status_notification_walgreen::new_status_notification_walgreen;
use crate::structs::structs::ChangeOrderStatusBody;
use crate::structs::tool_functions::extract_u32;

pub async fn change_status_walgreen(pool : Extension<Arc<Mutex<PooledConn>>>, Json(body) : Json<ChangeOrderStatusBody>) -> impl IntoResponse {
    match extract_u32(body.order_id) {
        Ok(id) => {
            let mut unlocked = pool.lock().await;
            match change_status_walgreen_sql(&mut unlocked, id, body.new_status.clone()) {
                Ok(_) => {
                    match new_status_notification_walgreen(id, body.new_status).await {
                        Ok(()) => {
                            reply_with_message(true, "Status of order has been changed")
                        }
                        Err(err) => {
                            reply_with_message(false, err)
                        }
                    }
                }
                Err(err) => {reply_with_message(false, err)}
            }
        }
        Err(err) => {reply_with_message(false, err)}
    }
}