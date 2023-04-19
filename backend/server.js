/* eslint-disable no-unused-vars */
const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const { Payment, Item, User, Transaction } = require('./db.js');
const jwt = require('jsonwebtoken');
const app = new Koa();
const router = new Router();

app.use(bodyParser());
const secret = 'secret';
const items = [
	{
		id: 1,
		description: 'lorem ipsum dollor shit',
		img: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/09a74b1023f2497989f9ad55005f1538_9366/CLEAR_FACTOR_SHOES_Black_EX2038_01_standard.jpg',
		title: 'Shoe',
		price: 16,
	},
	{
		id: 2,
		description: 'lorem ipsum dollor shit',
		img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81m3bRVpEqL._SL1500_.jpg',
		title: 'Cooling Pad',
		price: 21,
	},
	{
		id: 3,
		description: 'lorem ipsum dollor shit',
		img: 'https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg',
		title: 'Laptop',
		price: 12,
	},
	{
		id: 4,
		description: 'lorem ipsum dollor shit',
		img: 'http://cdn.shopify.com/s/files/1/0057/8938/4802/products/3-2.png?v=1653637007',
		title: 'Watch',
		price: 18,
	},
	{
		id: 5,
		description: 'lorem ipsum dollor shit',
		img: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61Y30DpqRVL._SX522_.jpg',
		title: 'Macbook Pro',
		price: 16,
	},
	{
		id: 6,
		description: 'lorem ipsum dollor shit',
		img: 'https://content.rolex.com/dam/watches/family-pages/cosmograph-daytona/all-models/professional-watches-cosmograph-daytona-share_m116518ln_0040_1706jva_001_r.jpg',
		title: 'Rolex',
		price: 21,
	},
	{
		id: 7,
		description: 'lorem ipsum dollor shit',
		img: 'https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1674042508/Croma%20Assets/Communication/Headphones%20and%20Earphones/Images/228519_0_kncroo.png/mxw_640,f_auto',
		title: 'Headphone',
		price: 12,
	},
	{
		id: 8,
		description: 'lorem ipsum dollor shit',
		img: 'https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/a/carmen_base_27_starrywhite_hdcam_swissbriekbm_front.png',
		title: 'Desktop',
		price: 16,
	},
];
router.get('/api/call', async (ctx) => {
	for (let i = 0; i < items.length; i++) {
		await Item.create({
			title: items[i].title,
			description: items[i].description,
			img: items[i].img,
			price: items[i].price,
			add: '0x6e598be2ac70193F3D7134cfb3Dd23949BD71C5c',
		});
	}
	ctx.body = { status: 'ok' };
});

router.get('/api/getUser', async (ctx) => {
	const email = ctx.query.email;
	console.log(email);
	var user;
	try {
		user = await User.findOne({ email: email });
	} catch (err) {
		ctx.status = 500;
		ctx.body = { msg: err };
		return;
	}
	ctx.body = { user };
});
router.post('/api/add-item', async (ctx) => {
	const { title, price, img, description, add } = ctx.request.body;
	const item = await Item.create({ title, price, img, description, add });
	console.log(ctx.request);
	console.log(ctx.request.body);
	ctx.body = { status: 'ok', item };
});

router.post('/api/signup', async (ctx) => {
	const { firstName, lastName, email, password, confirmPassword, add } =
		ctx.request.body;
	if (password !== confirmPassword) {
		ctx.body = { status: 'error', message: 'passwords do not match' };
		return;
	}
	console.log(add[0]);
	var user;
	try {
		user = await User.create({
			firstName,
			lastName,
			email,
			password,
			add: add[0],
		});
	} catch (err) {
		ctx.status = 400;
		ctx.body = { msg: 'Account already exists' };
		return;
	}

	// console.log(ctx.request);
	console.log(ctx.request.body);
	ctx.body = { status: 'ok', user };
});

router.post('/api/login', async (ctx) => {
	const { email, password } = ctx.request.body;
	const user = await User.findOne({ email, password });
	if (user) {
		const payload = {
			user: user.email,
			add: user.add,
		};

		const token = jwt.sign(payload, secret, { expiresIn: '1h' });
		ctx.body = { status: 'ok', user, token };
	} else {
		ctx.status = 401;
		ctx.body = { status: 'error', message: 'please enter correct credentials' };
	}
});

router.get('/api/getusers', async (ctx) => {
	const users = await User.find({});
	ctx.body = users;
});

router.get('/verifyToken', async (ctx) => {
	const token = ctx.query.token;

	try {
		const decoded = jwt.verify(token, secret);
		ctx.body = decoded;
	} catch (error) {
		ctx.status = 401;
		ctx.body = { message: 'Invalid token' };
	}
});

router.get('/api/get-items', async (ctx) => {
	const items = await Item.find({});
	ctx.body = items;
});

router.get('/api/getItemUrl/:paymentId', async (ctx) => {
	const { paymentId } = ctx.params;
	const payment = await Payment.findOne({ id: paymentId });
	if (payment && payment.paid) {
		ctx.body = { url: `https://www.youtube.com/watch?v=${payment.itemId}` };
	} else {
		ctx.body = { url: '' };
	}
	// ctx.body = {};
});
router.post('/api/buy/', async (ctx) => {
	const { itemId, price, user, paymentId } = ctx.request.body;

	const usr = await Transaction.create({
		itemId,
		price,
		transactionId: paymentId,
		user,
	});
	ctx.body = { status: 'ok', user: usr };
});

router.get('/api/getuseritems', async (ctx) => {
	const email = ctx.query.email;
	const transactions = await Transaction.find({ user: email });
	var items = [];
	for (let i = 0; i < transactions.length; i++) {
		const item = await Item.findOne({ _id: transactions[i].itemId });
		// item.transactionId = transactions[i].transactionId;
		// // console.log(item.transactionId);
		// for (key in item) {
		// 	console.log(key);
		// }
		var it = {};
		it.title = item.title;
		it.price = item.price;
		it.img = item.img;
		it.description = item.description;
		it.transactionId = transactions[i].transactionId;

		items.push(it);
	}
	ctx.body = { items };
});
router.get('/api/getTransactions', async (ctx) => {
	const email = ctx.query.email;
	const itemId = ctx.query.itemId;
	const transactions = await Transaction.find({ user: email, itemId: itemId });

	ctx.body = { transactions };
});
app.use(cors()).use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
