use reqwest::{Error, Response};
use serde_json::json;
use crate::structs::constants::TG_EXPRESS_API_PORT;

pub async fn new_status_notification_walgreen(id : u32, new_status : String) -> Result<(), Error> {
    let json_data = json!({
        "id" : id,
        "new_status" : new_status,
        "key" : r#"XP{B3edA"s$i4im78u-Jt3BkTBH]%("#
    });
    match reqwest::Client::new()
        .post(format!("http://rust-axum-tg:{}/telegram/new_status/walgreen", TG_EXPRESS_API_PORT()))
        .json(&json_data)
        .send()
        .await
    {
        Ok(_) => {return Ok(())}
        Err(err) => {return Err(err)}
    }
}