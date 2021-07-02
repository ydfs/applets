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
	dramaComment(id, { content, parent_id, cited_user_id }, created_at) {
		return wxRequest.post(`${API.dramaList}/${id}`,  {
      content,
      parent_id,
      cited_user_id,
      created_at
    });
	},
	commentDelete(id) {
		return wxRequest.delete(API.commentDelete(id));
	},
	login(params = {}) {
		return wxRequest.post(API.login, params);
	}
};
