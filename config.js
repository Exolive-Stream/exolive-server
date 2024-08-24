
require("dotenv").config();

module.exports = {
  // directories
  ROOT_DIR: __dirname, 
  PUBLIC_DIR: __dirname + "/client/dist",
  
  LANGUAGES: ["en", "es"],
  SECRET_TOKEN: process.env.SECRET_TOKEN || "supersecrettoken",

  SERVER_PORT: process.env.PORT || 3000,
  CLIENT_PORT: process.env.CLIENT_PORT || 3001,
}
