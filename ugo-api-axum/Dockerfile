#FROM rust:1.70
#
#COPY ./ ./
#
#RUN cargo build --release
#
#CMD ["./target/release/ugo-api-axum"]

#ARG BASE_IMAGE=rust:1.70
#
#FROM $BASE_IMAGE as builder
#WORKDIR /app
#COPY . .
#RUN cargo build --release
#CMD ["./target/release/ugo-api-axum"]
#
#FROM $BASE_IMAGE
#COPY --from=builder /app/bot_token.txt /
#COPY --from=builder /app/mysql.txt /
#COPY --from=builder /app/target/release/ugo-api-axum /
#CMD ["./ugo-api-axum"]

FROM messense/rust-musl-cross:x86_64-musl as chef

RUN cargo install cargo-chef
WORKDIR /ugo-api-axum

FROM chef AS planner
COPY . .
RUN cargo chef prepare --recipe-path recipe.json

FROM chef AS builder

COPY --from=planner /ugo-api-axum/recipe.json recipe.json
COPY --from=planner /ugo-api-axum/bot_token.txt bot_token.txt
COPY --from=planner /ugo-api-axum/mysql.txt mysql.txt

RUN sudo apt-get update && sudo apt-get -y upgrade
RUN sudo apt-get -y install libssl-dev
RUN sudo apt-get -y install pkg-config
RUN sudo apt-get -y install libudev-dev
RUN sudo apt-get -y install librust-openssl-sys-dev

RUN rustup target add x86_64-unknown-linux-musl
# Build dependencies - this is the caching Docker layer!
RUN cargo chef cook --release --target x86_64-unknown-linux-musl --recipe-path recipe.json
# Build application
COPY . .
RUN cargo build --release --target x86_64-unknown-linux-musl

# We do not need the Rust toolchain to run the binary!
FROM scratch
COPY --from=builder /ugo-api-axum/bot_token.txt /usr/local/bin/bot_token.txt
COPY --from=builder /ugo-api-axum/mysql.txt /usr/local/bin/mysql.txt
COPY --from=builder /ugo-api-axum/target/x86_64-unknown-linux-musl/release/ugo-api-axum /usr/local/bin/ugo-api-axum
ENTRYPOINT [ "ugo-api-axum" ]