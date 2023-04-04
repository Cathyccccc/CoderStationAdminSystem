import { request } from '@umijs/max';

/**
 * 分页获取某个板块的评论数据（issue/book）
 * @param {*} type
 * @param {*} params
 * @returns {Array}
 */
export const getCommentByType = (type, params) => {
  return request(`/api/comment/${type}`, {
    method: 'GET',
    params,
  });
};

/**
 * 删除评论
 * @param {*} id 评论_id
 */
export const delComment = (id) => {
  return request(`/api/comment/${id}`, {
    method: 'DELETE',
  });
};
