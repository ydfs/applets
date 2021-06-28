// const MODE = "devlopment";
// // const MODE = 'production';
// const VERSION = "V0.0.1";
// const PRODUCTION_APPID = 7;
// const PRODUCTION_PREFIX = "https://course.jiker.com";
// const DEVELOPMENT_PREFIX = "https://course.jiker.vip";
// const PREFIX = MODE === "production" ? PRODUCTION_PREFIX : DEVELOPMENT_PREFIX;
const API_PREFIX = "http://api.jevescript.com";
export default {
	// MODE,
	// version: VERSION,
	// app_id: PRODUCTION_APPID,

	dramaClassify: `${API_PREFIX}/api/web/book-category`,
	dramaList: `${API_PREFIX}/api/web/books`,
	dramaComment: id => `${API_PREFIX}/api/web/books/${id}/comment`,
	commentDelete: id => `${API_PREFIX}/api/web/books/${id}/comment/${id}`
};
