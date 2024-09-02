const { Pool } = require('pg')
const connectionString = process.env.DB_OWNER_CONNECTION || process.env.DB_CONNECTION

const userTable = 'app.app_user'
let pool: any

const initPool = async() => {
  if (!pool) {
    if (!connectionString) throw new Error('config.connectionString required')

    pool = new Pool({
      connectionString: connectionString,
    })
  }
}


const doQuery = async (sql: string, params?: string [], asUsername?: string) => {
  let client
  await initPool()
  try {
    client = await pool.connect()
    if (asUsername) {
      const user = (await client.query(`select * from ${userTable} where username = $1;`, [asUsername])).rows[0]
      await client.query(`set jwt.claims.contact_id = '${user.contact_id}';`)
    }
    const result = await client.query(sql,params)
    return result
  } catch (e: any) {
    console.log('ERROR: PGCLIENT:', e.toString())
    throw e
  } finally {
    client.release()
  }
}

const findUser = async (username: string) => {
  const result = await doQuery(`select * from ${userTable} where username = $1;`, [username]);
  return result.rows[0];
};

const becomeUser = async (username: string) => {
  const user = await findUser(username)
  await doQuery(`set jwt.claims.contact_id = '${user.contact_id}';`);
  return user
};

export {
  doQuery
  ,findUser
  ,becomeUser
}
