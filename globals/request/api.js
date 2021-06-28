const API_PREFIX = "http://api.jevescript.com";
export default {
	dramaClassify: `${API_PREFIX}/api/web/book-category`,
	dramaList: `${API_PREFIX}/api/web/books`,
	dramaComment: id => `${API_PREFIX}/api/web/books/${id}/comment`,
	commentDelete: id => `${API_PREFIX}/api/web/books/${id}/comment/${id}`
};
