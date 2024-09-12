use reqwest::{Error, Response};
use serde_json::json;
use crate::structs::constants::TG_EXPRESS_API_PORT;

pub async fn add_note_notification_walgreen() -> Result<(), Error> {
    let json_data = json!({
        "key" : r#"XP{B3edA"s$i4im78u-Jt3BkTBH]%("#
    });
    match reqwest::Client::new()
        .post(format!("http://tg-express-api:{}/telegram/new_note/walgreen", TG_EXPRESS_API_PORT()))
        .json(&json_data)
        .send()
        .await
    {
        Ok(_) => {return Ok(())}
        Err(err) => {return Err(err)}
    }
}