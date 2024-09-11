use std::sync::Arc;
use axum::{Extension, Router};
use axum::routing::post;
use mysql::PooledConn;
use tokio::sync::{Mutex};
use crate::routers::crm::login_actions_crm_routes::login_attempt_route::login_attempt_route::login_attempt_route;
use crate::routers::crm::login_actions_crm_routes::stealth_login_route::stealth_login::stealth_login;

// Defined routes are used for logging in (__admin-panel)

pub fn login_actions_crm(arc_sql : Arc<Mutex<PooledConn>>) -> Router {
    return Router::new()
        .route("/api/login/attempt", post(login_attempt_route))
            .layer(Extension(Arc::clone(&arc_sql)))
        .route("/api/login/stealth", post(stealth_login))
}