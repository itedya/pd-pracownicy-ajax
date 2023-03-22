import "dotenv/config";
import db from "../database/knex.js";
import path from "path";
import fs from "fs/promises";
import __srcpath from "../helpers/srcpath.helper.js";




migrate();
