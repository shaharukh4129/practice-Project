const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to database")
    })
        .catch(() => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        })

}
module.exports = connectDatabase;