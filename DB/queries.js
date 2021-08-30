const Pool = require('pg').Pool;

const pool = new Pool ({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: '5432'
})

// Get all users
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, result) => {
        if(error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

// Get a single user by ID
const getUserByID = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

// Post a new user
const createUser = (request, response) => {
    const { name, email } = request.body
    console.log(request.body);
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [name, email], (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.rows[0].id}`)
      console.log(result)
    })
  }

  // Put updated data in an existing user
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  // Delete a user
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

  module.exports = {
      getUsers,
      getUserByID,
      createUser,
      updateUser,
      deleteUser
  }