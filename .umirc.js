import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'coderstation',
  },
  dva: {}, // 打开 dva 插件
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon: 'HomeOutlined',
    },
    {
      name: '管理员',
      path: '/admin',
      icon: 'UserOutlined',
      routes: [
        { name: '管理员列表', path: '/admin/adminList', component: './Admin' },
        {
          name: '添加管理员',
          path: '/admin/addAdmin',
          component: './Admin/addAdmin',
        },
        {
          path: '/admin/editAdmin/:id',
          component: './Admin/addAdmin',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '用户',
      path: '/user',
      icon: 'TeamOutlined',
      routes: [
        {
          name: '用户列表',
          path: '/user/userList',
          component: './User/UserList',
        },
        {
          name: '添加用户',
          path: '/user/addUser',
          component: './User/AddUser',
        },
        {
          path: '/user/editUser/:id',
          component: './User/AddUser',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '书籍',
      path: '/book',
      icon: 'ReadOutlined',
      routes: [
        {
          name: '书籍列表',
          path: '/book/bookList',
          component: './Book/BookList',
        },
        {
          name: '添加书籍',
          path: '/book/addBook',
          component: './Book/AddBook',
        },
        {
          path: '/book/editBook/:id',
          component: './Book/AddBook',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '面试题',
      path: '/interview',
      icon: 'EditOutlined',
      routes: [
        {
          name: '题目列表',
          path: '/interview/interviewList',
          component: './Interview/InterviewList',
        },
        {
          name: '添加题目',
          path: '/interview/addInterview',
          component: './Interview/AddInterview',
        },
        {
          path: '/interview/interviewList/:id',
          component: './Interview/InterviewDetail',
          hideInMenu: true,
        },
        {
          path: '/interview/editInterview/:id',
          component: './Interview/AddInterview',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '问答',
      path: '/issue',
      component: './Issue',
      icon: 'ProfileOutlined',
    },
    {
      name: '问答详情',
      path: '/issue/:id',
      component: './Issue/IssueDetail',
      hideInMenu: true,
    },
    {
      name: '评论',
      path: '/comment',
      component: './Comment',
      icon: 'MessageOutlined',
    },
    {
      name: '类型',
      path: '/type',
      component: './Type',
      icon: 'AppstoreOutlined',
    },
    {
      path: '/login',
      component: './Login',
      hideMenu: true,
      menuRender: false,
    },
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/static': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
    '/res': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  npmClient: 'npm',
});
