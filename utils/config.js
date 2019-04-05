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
    searchSpot: server + "/scenic/search/",
    getSpot: server + "/scenic/",
    forkSpot: server + "/favorite/scenic" ,
    cancelForkSpot: server + "/favorite/scenic/delete",
    getForkedSpots: server + "/favorite/scenic/",
    establishTeam: server +"/team/establish",
    getTeams: server +"/team/canJoin",
    getTeam: server +"/team/",
    getTeamMember: server +"/team/member/",
    getMyEstablishedTeam: server +"/team/my/established/",
    getMyJoinedTeam: server + "/team/my/joined/",
    joinTeam: server +"/team/join",
    quitTeam: server +"/team/quit",
    disbandTeam: server +"/team/disband",
    getTeamBySpot:server+"/team/all/",
    searchTeam: server + "/team/search"
  }
}
