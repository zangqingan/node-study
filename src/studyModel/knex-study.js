import knex from "knex";
import { loadDbConfig } from "./mysql-study.js";
// 创建链接
const db = knex({
  client: "mysql2",
  connection: loadDbConfig(),
});

// 查询用户表数据
// db("sys_user")
//   .select()
//   .then((rows) => {
//     console.log("查询成功", rows);
//   });
// const userData = await db("sys_user").select();
// console.log("查询成功", userData);

// 创建一个新的表
// 创建 knex_study 表（仅首次运行需要）
async function createTable() {
  const exists = await db.schema.hasTable("knex_study");
  if (!exists) {
    await db.schema.createTable("knex_study", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").unique();
      table.string("desc").notNullable();
      table.timestamps(true, true);
    });
    console.log("Created knex_study table!");
  }
}

// 模型
const KnexStudy = {
  // 创建
  async create(user) {
    return db("knex_study").insert(user);
  },

  // 查询所有
  async findAll() {
    return db("knex_study").select("*");
  },

  // 通过ID查询
  async findById(id) {
    return db("knex_study").where({ id }).first();
  },

  // 更新
  async update(id, updates) {
    return db("knex_study").where({ id }).update(updates);
  },

  // 删除
  async delete(id) {
    return db("knex_study").where({ id }).del();
  },
};

// 演示流程
async function main() {
  // 确保表存在
  await createTable();

  try {
    // 1. 创建
    const id = await KnexStudy.create({
      name: "tom",
      email: "tom@16213.com",
      desc: "other test data",
    });
    console.log(`Created user with ID: ${id}`);
    // 2. 查询所有
    const allData = await KnexStudy.findAll();
    console.log("All data:", allData);
    // 3. 查询单个
    const singleData = await KnexStudy.findById(1);
    console.log("Single data:", singleData);
    // 4. 更新
    const updateCount = await KnexStudy.update(4, { name: "Alice Updated" });
    console.log(`Updated ${updateCount}`);
    // 5. 删除
    const deleteCount = await KnexStudy.delete(5);
    console.log(`Deleted ${deleteCount} `);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // 关闭数据库连接
    await db.destroy();
  }
}

main();
