require("dotenv").config();
import { DataSource } from "typeorm";
import { resolve } from "path";
import Container from "typedi";

export const AppDataSource = new DataSource({
  type: "postgres",
  entities: [resolve(__dirname, "../models/*{.ts,.js}")],
  migrations: [resolve(__dirname, "../migrations/*{.ts,.js}")],
  synchronize: false,
  logging: true,
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
Container.set(DataSource, AppDataSource);
