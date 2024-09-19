use std::env;

// pub const SESSION_DURATION : u16 = 900; // duration of session after login in seconds

// pub const DEPLOY_PORT : u16 = 8000; // local port to deploy an API
pub const STANDARD_IP : &'static str = "0.0.0.0"; // standard IP for deploying

// /Users/egorivanov/Desktop/mysql.txt - MacOS
// C:\Users\User\Desktop\mysql.txt - Windows
// mysql.txt - Linux
// pub const FILE_LOCATION : &'static str = r#"/Users/egorivanov/Desktop/mysql.txt"#;

// /Users/egorivanov/Desktop/bot_token.txt - MacOS
// C:\Users\User\Desktop\bot_token.txt - Windows
// bot_token.txt - Linux
//pub const BOT_TOKEN_LOCATION : &'static str = r#"/Users/egorivanov/Desktop/bot_token.txt"#;

// https://ugo-vape.ru
// http://localhost:8000
// http://localhost:3000
// Replace cors route here! + check if there is a "/" at the end of URL, it shouldn't be there!

pub const BOT_CHAT_ID : &'static str = "-1002156530519";

// pub fn SESSION_DURATION() -> u16 {
//     match env::var("SESSION_DURATION") {
//         Ok(session_duration) => {
//             match session_duration.parse::<u16>() {
//                 Ok(session_duration) => {
//                     return session_duration
//                 }
//                 Err(err) => {
//                     println!("{}", err);
//                     return 900
//                 }
//             }
//         }
//         Err(err) => {
//             println!("SESSION_DURATION => {}", err);
//             return 900
//         }
//     }
// }

pub fn DEPLOY_PORT() -> u16 {
    match env::var("DEPLOY_PORT") {
        Ok(deploy_port) => {
            match deploy_port.parse::<u16>() {
                Ok(deploy_port) => {
                    return deploy_port
                }
                Err(err) => {
                    println!("{}", err);
                    return 8000
                }
            }
        }
        Err(err) => {
            println!("DEPLOY_PORT => {}", err);
            return 8000
        }
    }
}

pub fn FILE_LOCATION() -> String {
    match env::var("FILE_LOCATION") {
        Ok(file_location) => {
            return String::from(file_location)
        }
        Err(err) => {
            println!("FILE_LOCATION => {}", err);
            return String::from("mysql.txt")
        }
    }
}

pub fn BOT_TOKEN_LOCATION() -> String {
    match env::var("BOT_TOKEN_LOCATION") {
        Ok(bot_token_location) => {
            return String::from(bot_token_location)
        }
        Err(err) => {
            println!("BOT_TOKEN_LOCATION => {}", err);
            return String::from("bot_token.txt")
        }
    }
}

pub fn TG_EXPRESS_API_PORT() -> String {
    match env::var("TELEGRAM_API_PORT") {
        Ok(telegram_api_port) => {
            return String::from(telegram_api_port)
        }
        Err(err) => {
            println!("TG_EXPRESS_API_PORT => {}", err);
            return String::from("0")
        }
    }
}

pub fn AUTH_EXPRESS_API_PORT() -> String {
    match env::var("AUTH_EXPRESS_API_PORT") {
        Ok(auth_express_api_port) => {
            return String::from(auth_express_api_port)
        }
        Err(err) => {
            println!("AUTH_EXPRESS_API_PORT => {}", err);
            return String::from("1")
        }
    }
}

pub fn TOKEN_EXPRESS_API_PORT() -> String {
    match env::var("TOKEN_EXPRESS_API_PORT") {
        Ok(token_express_api_port) => {
            return String::from(token_express_api_port)
        }
        Err(err) => {
            println!("TOKEN_EXPRESS_API_PORT => {}", err);
            return String::from("2")
        }
    }
}

