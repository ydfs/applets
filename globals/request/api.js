const API_PREFIX = "http://api.jevescript.com";
export default {
	smsCode: `${API_PREFIX}/api/web/sms/code`,
	smsRegister: `${API_PREFIX}/api/web/sms/register`,
	userInfo: `${API_PREFIX}/api/web/users/user-info`,
	dramaClassify: `${API_PREFIX}/api/web/book-category`,
	dramaList: `${API_PREFIX}/api/web/books`,
	dramaComment: id => `${API_PREFIX}/api/web/books/${id}/comment`,
	commentDelete: id => `${API_PREFIX}/api/web/books/${id}/comment/${id}`,
	login: `${API_PREFIX}/api/login`
};
