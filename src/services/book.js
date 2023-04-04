import { request } from '@umijs/max';

/**
 * 分页获取书籍列表
 * @param {Object} pagination 分页信息
 * @returns {Array} 书籍列表
 */
export const getBookByPage = (pagination) => {
  return request('/api/book', {
    method: 'GET',
    params: pagination,
  });
};

/**
 * 根据id获取书籍对象
 * @param {String} id 书籍_id
 * @returns {Object} 书籍对象
 */
export const getBookByIdApi = (id) => {
  return request(`/api/book/${id}`, {
    method: 'GET',
  });
};

/**
 * 新增书籍
 * @param {Object} newBookInfo 要新增的书籍对象
 * @returns
 */
export const addBookApi = (newBookInfo) => {
  return request('/api/book', {
    method: 'POST',
    data: newBookInfo,
  });
};

/**
 * 根据id删除书籍
 * @param {String} id 书籍_id
 */
export const delBookApi = (id) => {
  return request(`/api/book/${id}`, {
    method: 'DELETE',
  });
};

/**
 * 编辑书籍
 * @param {String} id 书籍_id
 * @param {Object} newBookInfo 修改后的书籍对象
 * @returns
 */
export const editBookApi = (id, newBookInfo) => {
  return request(`/api/book/${id}`, {
    method: 'PATCH',
    data: newBookInfo,
  });
};
