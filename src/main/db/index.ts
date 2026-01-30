import { Database, DbInfo } from './database'


const qbdbinfo: DbInfo = {
    host: "127.0.0.1", port: 3399, user: "root", password: "lf99onez.com", database: "onez_questionbank"
}




export function testdb() {
    let test = new Database(qbdbinfo)
    test.query("select * from p_paper_group_price where uuid=?", ["001ac811b6ac4ef99c8d5d7edcfca1a9"])
}

export class Questionbank {
    qbDatabase;
    constructor(qbdbinfo: DbInfo) {
        this.qbDatabase= new Database(qbdbinfo)
    }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  queryProductById = (productid: string) =>
    this.qbDatabase.query('select * from p_paper_group_price where uuid=?', [
      productid
    ])
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    queryProductBySimpleCode = (code: string) =>
    this.qbDatabase.query('select * from p_paper_group_price where simple_code=?', [
      code
    ])
}