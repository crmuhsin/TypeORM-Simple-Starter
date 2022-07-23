import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpass",
    database: "work",
    synchronize: true,
    logging: false,
    entities: [
        "src/db/entity/**/*.ts"
    ],
    migrations: [
        "src/db/migration/**/*.ts"
    ],
    subscribers: [
        "src/db/subscriber/**/*.ts"
    ]
})
