import mysql from 'mysql2/promise';

export interface DbInfo{
    host:string,
    port:number;
    user:string,
    password:string,
    database:string,
}

export class Database {
  pool;
  host;
  port;
  user;
  password;
  database;
  constructor(dbInfo:DbInfo) {
    this.pool = null;
    this.host=dbInfo.host;
    this.port=dbInfo.port;
    this.user=dbInfo.user;
    this.password=dbInfo.password;
    this.database=dbInfo.database;
  }

  async connect() :Boolean{
    let result:boolean=false;
    try {
      this.pool = mysql.createPool({
        host: this.host,
        port: this.port,
        user:this.user,
        password: this.password,
        database: this.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      result=true;
      console.log('数据库连接成功');
    } catch (error) {
          result=false;
      console.error('数据库连接失败:', error);
    }
    return result;
  }

  async query(sql, params = []) {
    if (!this.pool) await this.connect();
    
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('查询失败:', error);
      throw error;
    }
  }

  async close() {
    if (this.pool) {
      await this.pool.end();
    }
  }
}

