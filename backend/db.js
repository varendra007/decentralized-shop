const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://varendramaurya:7o6P0121NHbn8Gld@cluster0.v40uxbm.mongodb.net/?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

const paymentSchema = new mongoose.Schema({
	id: String,
	itemId: String,
	paid: Boolean,
});

const itemSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	add: {
		type: String,
		required: true,
	},
});
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, // make the email field unique
	},
	password: {
		type: String,
		required: true,
	},
	add: {
		type: String,
		required: true,
	},
});

const transactionSchema = new mongoose.Schema({
	transactionId: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	itemId: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

const User = mongoose.model('User', userSchema);

const Payment = mongoose.model('Payment', paymentSchema);
const Item = mongoose.model('Item', itemSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { Payment, Item, User, Transaction };
