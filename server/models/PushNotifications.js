const Expo = require("expo-server-sdk");

const db = require("../db");

const dbKey = "pushNotifications";

const addPushToken = ({ token, platform, timezoneOffset }) => {
  //   if (!Expo.isExpoPushToken(token)) {
  //     return Promise.reject(new Error("Invalid Token"));
  //   }
  return db
    .table(dbKey)
    .where({ token })
    .then(docs => {
      if (docs.length > 0) {
        return Promise.reject(new Error("Push Token already registerd."));
      }
      return db.table(dbKey).insert({
        token,
        platform,
        timezoneOffset
      });
    });
};

module.exports = {
  dbKey,
  addPushToken
};
