require('dotenv').config();


module.exports = {
    PORT : process.env.PORT,
    CONNECTION_STRING: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9lbf98t.mongodb.net/${process.env.DB_NAME}`,
}
