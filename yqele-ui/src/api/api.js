import httpAxios from '../utils/request'

//登录接口
export const login = (params)=> httpAxios.post('/api/login',params);
export const registry = (params)=> httpAxios.post('/api/registry',params);


//知识库

//添加知识库
export const addknow  = (params)=> httpAxios.post('/api/know/add',params);
//查询知识库
export const knowlist  = (params)=> httpAxios.get('/api/know/list',{params});
//删除知识库
export const knowdel  = (params)=> httpAxios.get('/api/know/del',{params});
//编辑知识库
export const knowupdate  = (params)=> httpAxios.post('/api/know/update',params);


