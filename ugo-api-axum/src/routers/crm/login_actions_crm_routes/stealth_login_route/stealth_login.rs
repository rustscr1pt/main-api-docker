use axum::{Json};
use axum::response::IntoResponse;
use crate::generic_replies::generic_replies::reply_with_message;
use crate::structs::api_bridge_functions::check_for_token;
use crate::structs::structs::{StealthAuthToken};

pub async fn stealth_login(Json(body) : Json<StealthAuthToken>) -> impl IntoResponse {
    match check_for_token(&body.token).await {
        true => {reply_with_message(true, "Authorized by token")}
        false => {reply_with_message(false, "Token is not valid")}
    }
}