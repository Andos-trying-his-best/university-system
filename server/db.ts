import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Applicant",
    password: "Ando@666",
    port: 5432,
});

export default pool;