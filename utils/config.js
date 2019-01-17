const server = "http://120.77.205.70:8088";
module.exports = {
  api: {
    loginsession: "https://api.weixin.qq.com/sns/jscode2session",
    login: server + "/user/username/",
    register: server + "/user/add"
  }
}
