// const { Pool } = require('pg')
import pg from 'pg'
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:54322'

let fnbPgClient: FnbPgClient

class FnbPgClient {
  pool: any

  constructor() {
  }

  async initPool() {
    if (!this.pool) {
      this.pool = new pg.Pool({
        connectionString: connectionString,
      })
    }
    return this.pool
  }

  async doQuery(sql: string, params?: string []) {
    // console.log('*************************')
    // console.log('SQL', sql)
    // console.log('*************************')
    let client
    try {
      const pool = await this.initPool()
      if (!client) {      
        client = await pool.connect()
      }
      await client.query('BEGIN')
      // console.log(sql, params)
      const result = await client.query(sql,params)
      await client.query('COMMIT')
      return {
        ...result
      }
    } catch (e: any) {
      await client.query('ROLLBACK')
      console.log('PG CLIENT ERROR:', e.toString(), sql.slice(0,50))
      throw e
    } finally {
      client.release()
    }
  }
  
  async endPool() {
    // console.log('ending pool', connectionString)
    if (this.pool) {
      await this.pool.end()
      this.pool = null  
    }
  }  
}

const useFnbPgClient = () => {
  if (!fnbPgClient) {
    fnbPgClient = new FnbPgClient()
  }

  return fnbPgClient
}

export { FnbPgClient, useFnbPgClient }
