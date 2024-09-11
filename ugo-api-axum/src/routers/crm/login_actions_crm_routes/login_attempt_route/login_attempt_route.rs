use std::sync::Arc;
use axum::{Extension, Json};
use axum::response::IntoResponse;
use mysql::{PooledConn};
use tokio::sync::Mutex;
use crate::generic_replies::generic_log_writer::generic_log_writer;
use crate::generic_replies::generic_replies::reply_with_message;
use crate::structs::api_bridge_functions::{add_token_to_db, check_if_authorized};
use crate::structs::structs::{LoginRequestData};
use crate::structs::tool_functions::release_string_uuid;

pub async fn login_attempt_route(main_actor : Extension<Arc<Mutex<PooledConn>>>, Json(body) : Json<LoginRequestData>) -> impl IntoResponse {
    match check_if_authorized(&body.login, &body.password).await {
        true => {
            let generated_token: String = release_string_uuid();
            match add_token_to_db(&generated_token).await {
                true => {
                    let mut unlocked = main_actor.lock().await;
                    match generic_log_writer(format!("Попытка войти с данными : {} - {} => Успешно. Выдан токен : {}.", body.login, body.password, &generated_token), &mut unlocked) {
                        Ok(_) => {
                            return reply_with_message(true, &generated_token)
                        }
                        Err(err) => {
                            return reply_with_message(false, err)
                        }
                    }
                }
                false => {
                    return reply_with_message(false, "Couldn't add your token in a list. Try again")
                }
            }
        }
        false => {
            let mut unlocked = main_actor.lock().await;
            match generic_log_writer(format!("Попытка войти с данными : {} - {} => Ошибка. Неверные данные.", body.login, body.password), &mut unlocked) {
                Ok(_) => {
                    return reply_with_message(false, "Couldn't find you in a list. Try again")
                }
                Err(e) => {
                    return reply_with_message(false, e)
                }
            }
        }
    }
}