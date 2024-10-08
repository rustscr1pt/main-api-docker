use std::sync::Arc;
use axum::{Extension, Json};
use axum::response::IntoResponse;
use mysql::PooledConn;
use tokio::sync::Mutex;
use crate::generic_replies::generic_replies::reply_with_serialized_struct;
use crate::routers::ugo_vape::ugo_vape_crm_routes::add_note_to_order::add_note_notification_ugo::add_note_notification_ugo;
use crate::routers::ugo_vape::ugo_vape_crm_routes::add_note_to_order::add_note_to_order_sql::add_note_to_order_sql;
use crate::structs::structs::AddNoteToOrder;
use crate::structs::tool_functions::extract_u32;

pub async fn add_note_to_order(main_actor : Extension<Arc<Mutex<PooledConn>>>, Json(body) : Json<AddNoteToOrder>) -> impl IntoResponse {
    match extract_u32(body.order_id) {
        Ok(id) => {
            let mut unlocked = main_actor.lock().await;
            match add_note_to_order_sql(&mut unlocked, id, body.note_to_add) {
                Ok(value) => {
                    match add_note_notification_ugo().await {
                        Ok(()) => {
                            reply_with_serialized_struct(true, "Your note has been added", value)
                        }
                        Err(err) => {
                            reply_with_serialized_struct(false, err, Vec::new())
                        }
                    }
                }
                Err(e) => {
                    reply_with_serialized_struct(false, e, Vec::new())
                }
            }
        }
        Err(e) => {
            reply_with_serialized_struct(false, e, Vec::new())
        }
    }
}