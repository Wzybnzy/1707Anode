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

//文档


//添加文档
export const fileadd  = (params)=> httpAxios.post('/api/file/add',params);
//获取文档列表
export const filelist  = (params)=> httpAxios.get('/api/file/list',{params});
//删除文档列表
export const filedel  = (params)=> httpAxios.get('/api/file/del',{params});
//便捷文档列表
export const fileupdate  = (params)=> httpAxios.post('/api/file/update',params);
//搜索文档
export const filesearch  = (params)=> httpAxios.get('/api/file/search',{params});
//文档详情接口
export const filedetail  = (params)=> httpAxios.get('/api/file/detail',{params});


//关注

//添加关注
export const followadd  = (params)=> httpAxios.post('/api/follow/followadd',params);
//获取所有的关注
export const followlist  = (params)=> httpAxios.get('/api/follow/followlist',{params});
//取消关注
export const followdel  = (params)=> httpAxios.get('/api/follow/followdel',{params});


// 收藏
//添加收藏
export const colladd  = (params)=> httpAxios.post('/api/coll/add',params);
//获取收藏列表
export const colllist  = (params)=> httpAxios.get('/api/coll/list',{params});

//取消收藏
export const colldel  = (params)=> httpAxios.get('/api/coll/delt',{params});