const request = require('supertest');
const server = require('./server.js');

/* --------------------- Authentication -------------------- */
describe('Authentication', function() {
	it('should return 401 if not logged in /inventory', function(done) {
		request(server)
			.get('/inventory')
			.set('Accept', 'application/json')
			.expect(401, done);
	});

	it('should return 401 on a failed login', function(done) {
		request(server)
			.post('/login')
			.send({ email: 'jdoe@abc.com', password: 'Ff!738FJ*' })
			.set('Accept', 'application/json')
			.expect(401, done);
	});

	it('should validate with a jwt on signup', function(done) {
		request(server)
			.post('/register')
			.send({ name: 'Jane Doe', email: 'jdoe@abc.com', password: 'Ff!738FJ*' })
			.end(function(err, res) {
				token = res.body.token;
				request(server)
					.get('/inventory')
					.set('Authorization', token)
					// checking its validated
					.expect(200)
					.end(function(err, res) {
						//making sure token is there
						expect(typeof token).toBe('string');
						//adding new user to possible collaberator list
						request(server)
							.post('/staff')
							.send({ name: 'Jane Doe' })
							.end(function(err, res) {
								if (err) return done(err);
								done();
							});
					});
			});
	});

	it('should validate with a jwt on login', function(done) {
		request(server)
			.post('/login')
			.send({ email: 'jdoe@abc.com', password: 'Ff!738FJ*' })
			.set('Accept', 'application/json')
			// checking its validated
			.expect(200)
			.end(function(err, res) {
				//making sure token is there
				expect(typeof token).toBe('string');
				if (err) return done(err);
				done();
			});
	});
});

/* --------------------- Inventory Endpoints -------------------- */

describe('/inventory CRUD', function() {
	it('should create an item', function(done) {
		request(server)
			.post('/inventory')
			.send({ name: 'strawberries', amount: 3, unit: 'lb(s)', categoryID: 1 })
			.set('Accept', 'application/json')
			.expect(201, done);
	});

	it('should return 400 error if missing name/amount/unit of item', function(done) {
		request(server)
			.post('/inventory')
			.send({ name: '' , amount: null, unit: 'lbs', categoryID: 1})
			.set('Accept', 'application/json')
			.expect(400, done);
	});

	it('should update an item in /inventory/:id', function(done) {
		request(server)
			.put('/inventory/1')
			.send({ name: 'blueberries', amount: 1, unit: 'lb', categoryID: 1 })
			.expect(200)
			.end(function(err, res) {
				expect(typeof res).toBe('object');
				if (err) return done(err);
				done();
			});
	});

	it('should return 400 error if missing  name/amount/unit in update', function(done) {
		request(server)
			.put('/inventory/1')
			.send({ name: '', amount: 5, unit: '', categoryID: null })
			.expect(400, done);
	});

	it('should return 200 if logged in /inventory', function(done) {
		request(server)
			.get('/inventory')
			.set('Authorization', token)
			.expect(200, done);
	});

	it('should return 200 if logged in /inventory/:id', function(done) {
		request(server)
			.get('/inventory/1')
			.set('Authorization', token)
			.expect(200, done);
	});

	it('should delete an item', function(done) {
		request(server)
			.del('/inventory/1')
			.expect(200, done);
	});

	it('should respond with 404 no item found to delete', function(done) {
		request(server)
			.del('/inventory/4')
			.expect(404, done);
	});
});

/* --------------------- Category Endpoints -------------------- */

describe('/categories CRUD', function() {
	it('should create a category', function(done) {
		request(server)
			.post('/categories')
			.send({ name: 'fruit'})
			.set('Accept', 'application/json')
			.expect(201, done);
	});

	it('should return 400 error if missing name of the category', function(done) {
		request(server)
			.post('/categories')
			.send({ name: '' })
			.set('Accept', 'application/json')
			.expect(400, done);
	});

	it('should update an item in /categories/:id', function(done) {
		request(server)
			.put('/categories/1')
			.send({ name: 'vegetables'})
			.expect(200)
			.end(function(err, res) {
				expect(typeof res).toBe('object');
				if (err) return done(err);
				done();
			});
	});

	it('should return 400 error if missing  name update', function(done) {
		request(server)
			.put('/categories/1')
			.send({ name: ''})
			.expect(400, done);
	});

	it('should return 200 if logged in /categories', function(done) {
		request(server)
			.get('/categories')
			.set('Authorization', token)
			.expect(200, done);
	});

	it('should return 200 if logged in /categories/:id', function(done) {
		request(server)
			.get('/categories/1')
			.set('Authorization', token)
			.expect(200, done);
	});

	it('should delete a category', function(done) {
		request(server)
			.del('/categories/1')
			.expect(200, done);
	});

	it('should respond with 404 no category found to delete', function(done) {
		request(server)
			.del('/categories/4')
			.expect(404, done);
	});
});
