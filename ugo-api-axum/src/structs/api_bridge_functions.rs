use reqwest::{Client, Error, Response};
use serde_json::json;
use crate::structs::constants::{AUTH_EXPRESS_API_PORT, TOKEN_EXPRESS_API_PORT};
use crate::structs::structs::Message;

pub async fn check_if_authorized(login : &String, password : &String) -> bool {
    let json_data = json!({
        "login" : login,
        "password" : password
    });
    match Client::new()
        .post(format!("http://auth-express-api:{}/authenticate/", AUTH_EXPRESS_API_PORT()))
        .json(&json_data)
        .send()
        .await
    {
        Ok(response) => {
            println!("{:?}", response);
            let middle_result = response.json().await;
            let json : Message = middle_result.unwrap();
            match json.is_succeed {
                true => {return true}
                false => {return false}
            }
        }
        Err(err) => {
            println!("{:?}", err);
            return false
        }
    }
}

pub async fn check_for_token(token : &String) -> bool {
    let json_data = json!({
        "token" : token
    });
    match Client::new()
        .post(format!("http://token-express-api:{}/tokens/check/", TOKEN_EXPRESS_API_PORT()))
        .json(&json_data)
        .send()
        .await
    {
        Ok(response) => {
            println!("{:?}", response);
            let middle_result = response.json().await;
            println!("{:?}", middle_result);
            let json : Message = middle_result.unwrap();
            match json.is_succeed {
                true => {return true}
                false => {return false}
            }
        }
        Err(err) => {
            println!("{:?}", err);
            return false
        }
    }
}

pub async fn add_token_to_db(token : &String) -> bool {
    let json_data = json!({
        "token" : token
    });
    match Client::new()
        .post(format!("http://token-express-api:{}/tokens/add/", TOKEN_EXPRESS_API_PORT()))
        .json(&json_data)
        .send()
        .await
    {
        Ok(response) => {
            println!("{:?}", response);
            let middle_result = response.json().await;
            let json : Message = middle_result.unwrap();
            match json.is_succeed {
                true => {return true}
                false => {return false}
            }
        }
        Err(err) => {
            println!("{:?}", err);
            return false
        }
    }
}