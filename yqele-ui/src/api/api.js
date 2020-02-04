import httpAxios from '../utils/request'

//登录接口
export const login = (params)=> httpAxios.post('/api/login',params);
export const registry = (params)=> httpAxios.post('/api/registry',params);


//知识库

//添加知识库
export const addknow  = (params)=> httpAxios.post('/api/know/add',params);


