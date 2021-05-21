# 网络请求

## 网络代理

## axios配置

### 响应拦截

对于服务端请求返回的状态码错误，是会走Promise.reject的，因次需要处理error参数。

```javascript
// 响应拦截
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      alert("NETWORK ERROR");
    } else {
      const code = error.response.status;
      const originalRequest = error.config;

      if (code === 401 && !originalRequest._retry) {
        console.error("跳转到登录页");
      }
      // 注意要将错误信息reject回去，保证其他页面可以捕获到
      return Promise.reject(error);
    }
  }
);
```

## useSWR

[useSWR](https://github.com/vercel/swr)是一款专门用于做缓存网络请求的工具包，基于此，对于一些请求类的数据，有很多方便的功能。

* 页面focus之后，重新更新数据请求
* 第一次数据从缓存中获取，然后后台更新，进行比对更新
* 错误自动重试
* ...更多功能可以参考官方文档

