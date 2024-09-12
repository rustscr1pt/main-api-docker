function tokenCleaner(mysqlConnection) {
    mysqlConnection
        .query("DELETE FROM api_tokens WHERE date_time < (NOW() - INTERVAL 10 MINUTE)",
            (err, results, fields) => {
                if (!err) {
                    console.log("Successfully cleaned old tokens")
                }
                else {
                    console.log(`Error when trying to clean the tokens.\n${err}`)
                }
            }
            )
}

module.exports = {tokenCleaner}