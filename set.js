const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUhnbWdJemV2TTBUTEN5czk2ZzhnMS8rVW9XYXZoSHNRT3V5ZXlxTjVYYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzJkcnh4SXpISmV3RkErQ2U5ZzIya0hpYWJmQWVrZTRWMVFIbzZCNU5qYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnUHNzM1pweCsybG43Y3NvM3dTQjliYjd6RGFabHVTZ28wckJOWFdvTkdVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaeGFDZ25IRVRxaE9CMmJmcUlVZk93aXFiYmVnMlVvVmdVQmhhdU5KY3dVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVFMkdseVhRY1RVNkFId01QN0J2ZGFSaHdsaHRoN09DSXpoQUtaUG1WMEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImI4WURBaDNiLzhuSGVuYStBMkJvaWdZNkpzTWF1SW13Mm04SDA0b2Fielk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkN0NDZIV2k1Qk9mZkM1VTRqU3ZMdWxkU3NWSlE4VHpEa00vOFcyOEQzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUnM4WDZQL2tFZEZkVXV5czZSbUZzRllnVFhQOE5ocGN3M1c1RTNaWVgwTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhKREthSW41VmdTSzFPR2RvV2ZHbDVVbjlaVnpQU1ZjNE91NXcwYy9KMFEzVTZkUW9DN3RoSHkyMGVmSHRONGM5eXcxQmxRL1FGNjFXTk5tWmlibmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcyLCJhZHZTZWNyZXRLZXkiOiJ4ZzJ3S25PNGR6cTg0bW1zWitxdmVxQytiL3lJMmJseVJZamY5QS8zWStvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6ZmFsc2UsImFjY291bnQiOnsiZGV0YWlscyI6IkNOTzIvTlVERUxDKy9Mc0dHQVFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ4ZnFYT25OSnJsNHBPWFFGRkFNMFZJengveGZPVkVwWVFLYks3MkxOTHpFPSIsImFjY291bnRTaWduYXR1cmUiOiJGQjJZNklibS9ta0I1cVZ5Z2hSeTF0Q3BMdlpTbVlqNmFRejRGWUp3K1NWUXZ0YkRnK0lmbjQydnd4ZFhuSG1mNWJxcVhDSWtwWDFXWnZ5cFZpWnZEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaTl5WFp3RVRlVStTd3Q0anZsVkU1Rkd5eFk3aUxJdHE2QUNIcElic0prVTBSOHlaRjNkYzJhR1ZxdE1lcXVpWHRQQUh0c3lZNndMdnRLOE9lcGhEaWc9PSJ9LCJtZSI6eyJpZCI6IjIzNzY3MzE1NTY5Nzo2OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJXaWxoZWxtIiwibGlkIjoiMjM3OTI4NjcyNDE5ODc1OjY4QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2NzMxNTU2OTc6NjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY1g2bHpwelNhNWVLVGwwQlJRRE5GU004ZjhYemxSS1dFQ215dTlpelM4eCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM2Mzg0MzA4LCJsYXN0UHJvcEhhc2giOiJJWG9EcCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUERvIn0=',
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
