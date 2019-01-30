const server = "http://120.77.205.70:8088";
module.exports = {
  api: {
    loginsession: "https://api.weixin.qq.com/sns/jscode2session",
    login: server + "/user/username/",
    register: server + "/user/add",
    getUser: server + "/user/",
    updateUser: server + "/user/update",
    getFriends: server + "/friend/",
    getFollowers: server + "/friend/followers/",
    followUser: server + "/friend",
    cancelFollowUser: server + "/friend/delete",
    uploadFile: server + "/uploadfile",
    getSpots: server + "/scenics",
    getSpot: server + "/scenic/",
    forkSpot: server + "/favorite/scenic" ,
    cancelForkSpot: server + "/favorite/scenic/delete",
    getForkedSpots: server + "/favorite/scenic/"
  }
}
