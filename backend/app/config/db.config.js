const defaultMongoUrl = "mongodb://localhost:27017/dd_db";

module.exports = {
  url: process.env.MONGODB_URL || defaultMongoUrl
};
