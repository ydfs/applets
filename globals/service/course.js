import wxRequest from "./../request/wxrequest.js";
import API from "./../request/api.js";

export default {
  // index(params = {}) {
  //   return wxRequest.get(API.courseIndex, params);
  // },
  // item(id) {
  //   return wxRequest.get(API.courseItem(id));
  // },
  // category(params = {}) {
  //   return wxRequest.get(API.category, params);
  // },
  // search(params = {}) {
  //   return wxRequest.get(API.courseSearch, params);
  // },
  
  dramaClassify() {
      return request.get(API.dramaClassify);
    },
    dramaList(params = {}) {
      return request.get(API.dramaList, params);
    },
    dramaDetails: id => {
      return request.get(`${API.dramaList}/${id}`);
    },
    dramaComment(params = {}) {
      return request.post(API.dramaComment(id), params);
    },
    commentDelete(id) {
      return request.delete(API.commentDelete(id));
    }
};