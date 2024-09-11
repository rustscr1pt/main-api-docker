use std::sync::Arc;
use axum::{Extension, Json};
use axum::response::IntoResponse;
use mysql::PooledConn;
use tokio::sync::Mutex;
use crate::generic_replies::generic_replies::reply_with_message;
use crate::routers::crm::admin_actions_crm_routes::add_admin_account::add_admin_account_sql::add_admins_account_sql;
use crate::structs::api_bridge_functions::check_for_token;
use crate::structs::structs::{AddAdminRequest};

pub async fn add_admin_account(pool : Extension<Arc<Mutex<PooledConn>>>, Json(body) : Json<AddAdminRequest>) -> impl IntoResponse {
    match check_for_token(&body.token).await {
        true => {
            let mut unlocked = pool.lock().await;
            match add_admins_account_sql(&mut unlocked, body.login, body.password) {
                Ok(()) => {
                    reply_with_message(true, "Account has been added to base")
                }
                Err(err) => {
                    reply_with_message(false, err)
                }
            }
        }
        false => {
            reply_with_message(false, "Couldn't find your token in the db.")
        }
    }
}