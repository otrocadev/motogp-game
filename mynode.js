const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: ".env" });

const envFile = `export const environment = {
    production: false,
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY}',
    MAPBOX_KEY: '${process.env.MAPBOX_KEY}',
};
`;

const envFileProd = `export const environment = {
    production: true,
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY}',
    MAPBOX_KEY: '${process.env.MAPBOX_KEY}',
e};
`;

const targetPathDev = path.join(
  __dirname,
  "./src/environments/environment.development.ts"
);
fs.writeFile(targetPathDev, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.development.ts`
    );
  }
});

const targetPathProd = path.join(
  __dirname,
  "./src/environments/environment.ts"
);
fs.writeFile(targetPathProd, envFileProd, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(
      successColor,
      `${checkSign} Successfully generated environment.ts`
    );
  }
});
