import { request } from '@umijs/max';

/**
 * 分页获取问答列表
 * @param {Object} pagination 分页对象
 * @returns {Array} 问答列表
 */
export const getIssueByPageApi = (pagination) => {
  return request('/api/issue', {
    method: 'GET',
    params: pagination,
  });
};

/**
 * 根据id获取问答对象
 * @param {String} id 问答_id
 * @returns {Object} 问答对象
 */
export const getIssueByIdApi = (id) => {
  return request(`/api/issue/${id}`, {
    method: 'GET',
  });
};

/**
 * 根据id删除问答
 * @param {String} id 问答_id
 */
export const delIssueApi = (id) => {
  return request(`/api/issue/${id}`, {
    method: 'DELETE',
  });
};

/**
 * 修改问答对象
 * @param {String} id 问答_id
 * @param {Object} newIssueInfo 修改后的问答对象
 */
export const editIssueApi = (id, newIssueInfo) => {
  return request(`/api/issue/${id}`, {
    method: 'PATCH',
    data: newIssueInfo,
  });
};
