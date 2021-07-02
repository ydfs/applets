import wxRequest from "./../request/wxrequest.js";
import API from "./../request/api.js";

export default {
	dramaClassify() {
		return wxRequest.get(API.dramaClassify);
	},
	dramaList(params = {}) {
		return wxRequest.get(API.dramaList, params);
	},
	dramaDetails(id) {
		return wxRequest.get(`${API.dramaList}/${id}`);
	},
	dramaComment(id, params = {}) {
		return wxRequest.post(`${API.dramaList}/${id}`, params);
	},
	commentDelete(id) {
		return wxRequest.delete(API.commentDelete(id));
	},
	login(params = {}) {
		return wxRequest.post(API.login, params);
	}
};
