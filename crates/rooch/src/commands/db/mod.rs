// Copyright (c) RoochNetwork
// SPDX-License-Identifier: Apache-2.0

use crate::cli_types::CommandAction;
use crate::commands::db::commands::revert_tx::RevertTxCommand;
use async_trait::async_trait;
use clap::Parser;
use commands::rollback::RollbackCommand;
use rooch_types::error::RoochResult;

pub mod commands;

/// DB Commands
#[derive(Parser)]
pub struct DB {
    #[clap(subcommand)]
    cmd: DBCommand,
}

#[async_trait]
impl CommandAction<String> for DB {
    async fn execute(self) -> RoochResult<String> {
        match self.cmd {
            DBCommand::RevertTx(revert_tx) => revert_tx.execute().await.map(|resp| {
                serde_json::to_string_pretty(&resp).expect("Failed to serialize response")
            }),
            DBCommand::Rollback(rollback) => rollback.execute().await.map(|resp| {
                serde_json::to_string_pretty(&resp).expect("Failed to serialize response")
            }),
        }
    }
}

#[derive(clap::Subcommand)]
#[clap(name = "db")]
pub enum DBCommand {
    RevertTx(RevertTxCommand),
    Rollback(RollbackCommand),
}
