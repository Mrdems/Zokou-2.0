const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0dVOHBROWV3aGtYQjRROVg3b3ZPeVFJdEg0cWpaNlRyWDV6YUlPNE4wcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWRhOVVMYXpNQkNyQnNsbjZqTWJXT1N1TVFZUDVKS25WeWhPRzhCWkhXUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSkpyT3N0YkdabEZWVEtJV0F1Vm5pbmt6VEN1cmhTeWZ0YTYvYUFSM0VjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqaldGc29zbk00TkRpMXpjOXdNVUJuN084OHRIMlNLQmRKZHBTL1VmRTBNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNPWVRKQmk0Zm1FZElBei9JUFlpZVR3Mk1abXdidXF3Y3RIdFlIU3p6RUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBMQmNSRjdyNzR3N0hBeG5hbG9ZNGZuU2luSmhhTS8xTGtpYWU0SU0vbGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0lQNDhwS0FlNFpCS1MwOWFoM0FoL0ZRZUlDTGozcXAwVTdQcHNMWTdXbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGRJbFVvQkRVVmxoTHhnK1ByWXo1bXp1WXE1eXkySnRGRlNDVTFFcWlURT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhkSU80bjU4ZWRHSTMyYVNtaElVRkFOSVJucVNxRkFGZ0FMdUVaVmRUd0tCUEhMKytEVG52WWJNT1hMUWJxaUF1MVk3WFBrWThaUGlEZFhFclVuT2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM1LCJhZHZTZWNyZXRLZXkiOiJzN3JtL0l2cCtUZCs0STNtM2JxaUR3WmdSK25zK3FYUE1FL3R2ZG9GbnM0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI0d1Z4UEVzeFFoNmxHNW92QXBlMFdnIiwicGhvbmVJZCI6ImFiZjAxMzI5LTI0N2UtNDdmNi1iZDJjLTRmYWZkMzJkZmJiMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNWkhkZjBQenYrV21LdGRFbkhxUDNqV3Z5NXM9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVsVWc4VVJGbTVYREdFVFhFR1M2QW1qZktYVT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xEV25QVUNFSldyaXJzR0dDd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRQRWE3cjV5Q2JBN1pBYWl1VTdaMVl3c1YzT0NkYlMvVXNPemhHb3d3QVU9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImVsVUN3TmcwL2MvcHVrK0pYN04zYWFzSUlJVC9vNDFicnZRb2FaU3JDNUVyOFMrc1VmRnJSWEJ3dG03Y01RZXpGbmZlWFVSZjFTMjYyVUVDKzczTEJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJPT0hHODFSSFcwYmVWc0ZGMkpUb3BUYlRudlhDQ2Q3Z3BranFYZ0FOYjBSS1FTeEhFbW5aZnE2blB4dHFlaVVtUFBJUlZlZXhkN2d3K09GSC96SlBnUT09In0sIm1lIjp7ImlkIjoiMjM3NjczMTU1Njk3OjQ4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuC8kiBXSUxMSUFNNTbwk4Os4LySIiwibGlkIjoiMjM3OTI4NjcyNDE5ODc1OjQ4QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2NzMxNTU2OTc6NDhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFR4R3U2K2NnbXdPMlFHb3JsTzJkV01MRmR6Z25XMHYxTERzNFJxTU1BRiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM0NTE0MDc5LCJsYXN0UHJvcEhhc2giOiJJWG9EcCJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
