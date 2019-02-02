const express = require('express');
const router = express.Router();
const knex = require('knex')
const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = 'secret'

// const secret = require('./keys').jwtKey;

function generateToken(user){
	const payload = {
		username: user.name,
	};
	const options = {
		expiresIn: '1h',
		jwtid: '12345'
	}
	return jwt.sign(payload, secret, options)
}

//Create
//create a new user and session
router.post('/register', (req, res) => {
	const creds = req.body
	const hash = bcrypt.hashSync(creds.password, 12);
	creds.password = hash;
	db('staff')
		.insert(creds)
		.then(ids => {
			const id = ids[0]
			db('staff')
			.where({id})
			.first()
			.then(user => {
				const token = generateToken(user);
				return res.status(200).json({token, id: user.id, name: user.name})
			})
			.catch(err => {
				console.log(err)
				res.status(500).json({msg: 'error generating token'})
			})
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({msg: "there was an error registering user"})
	})
})

//Create
//create a new user session
router.post('/login', (req, res) => {
	const creds = req.body;
	db('staff')
		.where({name: creds.name})
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(creds.password, user.password)){
				const token = generateToken(user)
				return res.status(200).json({token, id: user.id, name: user.name})
			} else {
				res.status(401).json({msg: 'you have failed to log in'})
			}
		})
})

//Read
//get a user by id
router.get('/:id', (req, res) => {
	const { id } = req.params
	db('staff')
	.where({id})
	.then(response => {
		let obj = {name: response[0].name, email: response[0].email}
		res.status(200).json(obj)
	})
	.catch(error => {
		console.log(error)
		res.status(500).json({msg: 'error getting users information'})
	})
})

//Update
//update a users account
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const {name, email} = req.body
	db('staff')
		.where({id})
		.update({name, email})
		.then(response => {
			res.status(200).json(response)
		})
		.catch(error => {
			res.status(500).json({msg: 'there was an error updating user'})
		})
})

//Delete
//delete a user
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('staff')
	.where({id})
	.del()
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})


module.exports = router;