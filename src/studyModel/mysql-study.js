import mysql from "mysql2/promise";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// 获取当前模块路径 (替代 __filename、__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../", "config", "dev.yaml");

console.log("filePath", filePath);
console.log("process", process.env.NODE_ENV);

// 读取YAML配置
const loadDbConfig = () => {
  try {
    const filePath = path.join(__dirname, "../", "config", "dev.yaml");
    const fileContents = fs.readFileSync(filePath, "utf8");
    return yaml.load(fileContents)[process.env.NODE_ENV];
  } catch (e) {
    console.error("Error loading DB config:", e.message);
    process.exit(1);
  }
};

// 创建数据库连接
const createConnection = async () => {
  try {
    const baseConfig = loadDbConfig();
    const config = {
      ...baseConfig,
      namedPlaceholders: true,
      supportBigNumbers: true,
      decimalNumbers: true,
    };
    return await mysql.createConnection(config);
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
    throw new Error(`Database connection failed:${err}`);
  }
};

// // 导出自定的执行查询函数（每次创建新连接）
export const query = async (sql, params) => {
  const connection = await createConnection();
  try {
    const [rows, fields] = await connection.execute(sql, params);
    return rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw new Error(`SQL Error: ${err.sqlMessage}`);
  } finally {
    if (connection) {
      await connection.end(); // 关闭连接
    }
  }
};

// 测试连接
query("SELECT * FROM sys_user").then((rows) => {
  console.log("Query result:", rows);
});
