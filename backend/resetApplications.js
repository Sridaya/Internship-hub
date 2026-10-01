const db = require("./database");

db.prepare("DROP TABLE applications").run();

console.log("Applications table deleted successfully.");

db.close();