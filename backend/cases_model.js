const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const getCases = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM cases ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        if(results){
            resolve(results.rows);
        } else {
            resolve([]);
        }
 
      })
    }) 
  }
  const createCase = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, email } = body
      pool.query('INSERT INTO cases (id, date, country) VALUES ($1, $2, $3) RETURNING *', [name, email], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`New case information has been added added: ${results?.rows[0]}`)
      })
    })
  }
  const deleteCase = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM cases WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Case deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getCases,
    createCase,
    deleteCase,
  }