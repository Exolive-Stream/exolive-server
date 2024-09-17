
require("dotenv").config();

module.exports = {
  // directories
  ROOT_DIR: __dirname, 
  PUBLIC_DIR: __dirname + "/client/dist",
  
  LANGUAGES: ["en", "es"],
  DEV: process.env.NODE_ENV !== 'production',
  SECRET_TOKEN: process.env.SECRET_TOKEN || "supersecrettoken",
  MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,

  SERVER_PORT: process.env.PORT || 3000,
  CLIENT_PORT: process.env.CLIENT_PORT || 3001,
}
