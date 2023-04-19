const { Payment, Item, User } = require('./db.js');
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
const fun = async () => {
	for (let i = 0; i < items.length; i++) {
		await Item.create({
			title: items[i].title,
			description: items[i].description,
			img: items[i].img,
			price: items[i].price,
			add: '0x6e598be2ac70193F3D7134cfb3Dd23949BD71C5c',
		});
	}
};

fun();
