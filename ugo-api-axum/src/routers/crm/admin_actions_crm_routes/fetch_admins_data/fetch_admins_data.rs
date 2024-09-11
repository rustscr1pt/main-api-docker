use std::sync::{Arc};
use tokio::sync::Mutex;
use axum::{Extension, Json};
use axum::response::IntoResponse;
use mysql::PooledConn;
use crate::generic_replies::generic_replies::reply_with_serialized_struct;
use crate::routers::crm::admin_actions_crm_routes::fetch_admins_data::fetch_admins_data_sql::fetch_admins_data_sql;
use crate::structs::api_bridge_functions::check_for_token;
use crate::structs::structs::{StealthAuthToken};

pub async fn fetch_admins_data(pool : Extension<Arc<Mutex<PooledConn>>>, Json(body) : Json<StealthAuthToken>) -> impl IntoResponse
{
    match check_for_token(&body.token).await {
        true => {
            let mut unlocked_pool = pool.lock().await;
            match fetch_admins_data_sql(&mut unlocked_pool) {
                Ok(result) => {
                    reply_with_serialized_struct(true, "Success", result)
                }
                Err(err) => {
                    reply_with_serialized_struct(false, err, Vec::new())
                }
            }
        }
        false => {
            reply_with_serialized_struct(false, "Invalid token", Vec::new())
        }
    }
}
