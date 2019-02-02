const express = require('express');
const router = express.Router();
const knex = require('knex')
const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

const protects = require('./middleWear.js');


//Create
//create a new category
router.post('', (req, res) => {
	const {name} = req.body
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide a category name'})
	}
	db.insert({name}).into('categories')
	.then(response => {
		return res.status(201).json(response)
	})
	.catch(error => {
		return res.status(500).json(error)
	})
})

//Read
//get all catagories
router.get('', protects, (req, res) => {
	db('categories')
		.then(response => {
			return res.status(200).json(response)
		})
		.catch(error => {
			console.log(error)
			return res.status(500).json({msg: 'there was an error getting categories'})
		})
})

//Read
//get all items for a catagory
router.get('/:id', (req, res) => {
	const {id} = req.params
	db('categories')
	.where({id})
	.first()
	.then(response => {
		let name = response.name
		db('categories')
		.join('items', 'categories.id', 'items.categoryID')
		.where('items.categoryID', id)
		.then(response => {
			let ar = []
			ar.push({catagory_name: name})
			for (let i = 0; i < response.length; i++){
				ar.push(response[i]);
			}
			return res.status(200).json(ar)
		})
		.catch(error => {
			return res.status(200).json(error)
		})
	})
})

//Update
//update a specific catagory
router.put('/:id', (req, res) => {
	const {id} = req.params
	const {name} = req.body
	db('categories')
	.where({id})
	.update({name})
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		return res.status(500).json({msg: 'error updating catagory'})
	})
})

//Delete
//delete a specific catagory
router.delete('/:id', (req, res) => {
	const {id} = req.params
	db('categories')
	.where({id})
	.del()
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		return res.status(500).json({msg: 'error deleting catagory'})
	})
})

module.exports = router;