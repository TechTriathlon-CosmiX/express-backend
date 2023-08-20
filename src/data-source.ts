import "reflect-metadata"
import { DataSource } from "typeorm"
import { Planet } from "./entity/Planet.js"
import 'dotenv/config';
import { Spaceport } from "./entity/Spaceport.js";
import { Flight } from "./entity/Flight.js";

export const AppDataSource: DataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Planet, Spaceport, Flight],
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.DB_SSL_CA,
    },
})
