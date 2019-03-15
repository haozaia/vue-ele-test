import axios from 'axios'
import qs from 'qs'   //qs库-->作用是格式化数据


var TIME_OUT = 50000;  //如果请求的时间超过'timeout'，请求将被中止
var st_base_prefix = 'http://shira1.midea.com:1002';
const base_axios_options = {
  headers:{ 'content-type': 'application/json' },
  timeout:5000,
  withCredentials:true,  //是否跨站点访问控制请求
};

