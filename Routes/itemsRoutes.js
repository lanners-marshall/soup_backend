const express = require('express');
const router = express.Router();
const knex = require('knex')
const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)
const url = require('url');

const protects = require('./middleWear.js');

//browser wil look like /catagories/1
// can do on front end
// let url = window.location.href
// let id = url.substring(url.lastIndexOf('/') + 1);
// then pass in object to axios like { ... catagorId: id}

//Create
//create a new item for a catagory
router.post('', (req, res) => {
	const {name, amount, unit, categoryID} = req.body
	let obj = {name, amount, unit, categoryID }
	db('items')
	.insert({name, amount, unit, categoryID})
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		return res.status(500).json(error)
	})
})

//Read
//get a sepcific item
router.get('/:id', (req, res) => {
	const {id} = req.params
	db('items')
	.where({id})
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		return res.status(500).json({msg: 'fail to get item'})
	})
})

//Update
//update an items string name or amount
router.put('/:id', (req, res) => {
	const {id} = req.params
	const {name, unit} = req.body
	db('items')
	.where({id})
	.update({name, unit})
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		return res.status(500).json(response)
	})
})

//Delete
//delete an item
router.delete('/:id', (req, res) => {
	const {id} = req.params
	db('items')
	.where({id})
	.del()
	.then(response => {
		return res.status(200).json(response)
	})
	.catch(error => {
		return res.status(500).json(error)
	})
})



// exports.up = function(knex, Promise) {
// 	return knex.schema.createTable('items', (table) => {
// 		table.increments();
// 		table
// 			.string('name', 255)
// 			.notNullable()
// 			.unique();
// 		table.integer('amount').notNullable();
// 		table.string('unit').notNullable()
// 		table
// 			.integer('categoryID')
// 			.unsigned()
// 			.references('id')
// 			.inTable('categories');
// 	});

//Update
//update a users account
// router.put('/:id', (req, res) => {
// 	const { id } = req.params;
// 	const {name, email} = req.body
// 	db('staff')
// 		.where({id})
// 		.update({name, email})
// 		.then(response => {
// 			res.status(200).json(response)
// 		})
// 		.catch(error => {
// 			res.status(500).json({msg: 'there was an error updating user'})
// 		})
// })

// //Delete
// //delete a user
// router.delete('/:id', (req, res) => {
// 	const { id } = req.params;
// 	db('staff')
// 	.where({id})
// 	.del()
// 	.then(response => {
// 		res.status(200).json(response)
// 	})
// 	.catch(error => {
// 		res.status(500).json(error)
// 	})
// })


// module.exports = router;



	// db('notes')
	// 	.join('notes_collaborators', 'notes_collaborators.note_id', '=', 'notes.id')
	// 	.join('collaborators', 'collaborators.id', '=', 'notes_collaborators.collaborator_id')
	// 	.where('notes.id', id)
	// 	.then(response => {



		// table.increments();
		// table
		// 	.string('name', 255)
		// 	.notNullable()
		// 	.unique();
		// table.integer('amount').notNullable();
		// table.string('unit').notNullable()
		// table
		// 	.integer('categoryID')
		// 	.unsigned()
		// 	.references('id')
		// 	.inTable('categories');

// //Create
// //create a new category
// router.post('', (req, res) => {
// 	const {name} = req.body
// 	if (!req.body.name){
// 		return res.status(400).json({msg: 'please provide a category name'})
// 	}
// 	db.insert({name}).into('categories')
// 	.then(response => {
// 		return res.status(201).json(response)
// 	})
// 	.catch(error => {
// 		return res.status(500).json(error)
// 	})
// })

// //Read
// //get all catagories
// router.get('', protects, (req, res) => {
// 	db('categories')
// 		.then(response => {
// 			return res.status(200).json(response)
// 		})
// 		.catch(error => {
// 			console.log(error)
// 			return res.status(500).json({msg: 'there was an error getting categories'})
// 		})
// })

// //Read
// //get a specific catagory
// router.get('/:id', protects, (req, res) => {
// 	const {id} = req.params
// 	db('categories')
// 	.where({id})
// 	.then(response => {
// 		return res.status(200).json(response)
// 	})
// 	.catch(error => {
// 		console.log(error)
// 	})
// })

// //Update
// //update a specific catagory
// router.put('/:id', (req, res) => {
// 	const {id} = req.params
// 	const {name} = req.body
// 	db('categories')
// 	.where({id})
// 	.update({name})
// 	.then(response => {
// 		return res.status(200).json(response)
// 	})
// 	.catch(error => {
// 		return res.status(500).json({msg: 'error updating catagory'})
// 	})
// })

// //Delete
// //delete a specific catagory
// router.delete('/:id', (req, res) => {
// 	const {id} = req.params
// 	db('categories')
// 	.where({id})
// 	.del()
// 	.then(response => {
// 		return res.status(200).json(response)
// 	})
// 	.catch(error => {
// 		return res.status(500).json({msg: 'error deleting catagory'})
// 	})
// })

module.exports = router;