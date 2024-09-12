use reqwest::{Error, Response};
use serde_json::json;
use crate::structs::constants::TG_EXPRESS_API_PORT;

pub async fn write_order_notification_ugo() -> Result<(), Error> {
    let json_data = json!({
        "key" : r#"XP{B3edA"s$i4im78u-Jt3BkTBH]%("#
    });
    match reqwest::Client::new()
        .post(format!("http://tg-express-api:{}/telegram/new_order/ugo", TG_EXPRESS_API_PORT()))
        .json(&json_data)
        .send()
        .await
    {
        Ok(_) => {return Ok(())}
        Err(err) => {return Err(err)}
    }
}