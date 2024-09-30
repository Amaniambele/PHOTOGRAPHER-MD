const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0dub0VVV2JuWmdKcjNkN21lVXlocmlnUEhaKy8rRkpoMWhrWTRXNE4xOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZmFlVm5reldFQmZtMjFtS1lwNHlPbUVEOWxkZ2VVeXJ3WjI3aXlsWHlVYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RitpZjMvMVM1SmlrS1M4SSs4TkxTTUJCUGdxcS9RTFFka1d0b3VjekZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVamVXTFZRVm12cjRtcm16YnRuUGw5ZGpEdW1kYU5xY0R5Y2pEZko0YmhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlPb2pPY1g0eVJpUml1SWJpamZQTkkxVFhUY2ZodlFVdUFaK3Bzd0NZbmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZ3R2tteHRyTVRXbVlyU1ZybnRwdkJFSUE5ZzlnNERtdGZFVGltNXI4aHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUxIampGLzUvanVvQjVEQ005V0JidXV0V21wKzhpZGdTSUNsQkJZcklucz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkFCbUg2MzlUUHNkSWR5WmVvZExjMTVaWWl6bEVmaUNPT0RwQ3NEaDRnMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFuYWtyNmpEV1JFK3g4d2ZvUmRydW0wWGFTemt0eEovcFFKaFo2dEJ4OTdDemZHbDNTTFFOR2RsdWRhczdqeWhyU2gvMVRlVWxjQWFsbStGVE1IM2pnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzAsImFkdlNlY3JldEtleSI6IjNuREtWU1BMU2UrSVFiQjN5cjViYmNqL0RCTzhUMnZHRmRHdGlXNGZTVlU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjFWWDJ0ZnpnU2dldlozMGI1RDNEZlEiLCJwaG9uZUlkIjoiNGU3ODQ3OTItMWNjMC00NzY4LTg1MzYtOWMwOTQ2OWQ0ZWVhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitTdWd3ZzJ1bkhXZ3FhSFRudjJOdGdjajhURT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3NHQ5MVI0RXZEVTdOSWFEeHRWclZtRU8vbzA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUlFKQ1NQTDciLCJtZSI6eyJpZCI6IjI1NTY5NjQ5NzcwOTo2M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBMSBQaG90b2dyYXBoZXIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09EVmdad0NFTWFVNmJjR0dEVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik54N2FibWNNWGppN01LR1pBUVZ0UFFzdFBob3lzSHZPd1cyeVZKRkJESDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkxNaFpmZTNmd2I4TE5yWE50czgvR1VwcUFOc25lQSs4aGV5cW9HdS9HWEUyQjRocjJCSWllVkZEdE5rUUtvT3k5NU5ZMW5COGdDaGlTWUtmdFZPT0RnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaUDR5S1BrTXQzWjlVbXdRM0praWQvS29zNStpd1dSbUtCL1ZwWGpxYmdoVEVDcFZMYnVzbG0vLzM3bmswVVJKUDdpeHdQNlNvY2xFQUEyc0tERGRqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY5NjQ5NzcwOTo2M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUY2UybTVuREY0NHV6Q2htUUVGYlQwTExUNGFNckI3enNGdHNsU1JRUXgrIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3Njc5MDYwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUt0RCJ9''zokk',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Photographer Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255696497709,255716661569",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'ℙℍ𝕆𝕋𝕆𝔾ℝ𝔸ℙℍ𝔼ℝ 𝕄𝔻',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/7f1ad109dca7888e23e56.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
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
