const network = require("../../utils/network.js");
const {
  api
} = require("../../utils/config.js");
const app = getApp();
const {
  $Message
} = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInput: '',
    current: 'following',
    list: [],
    visible: false,
    actions: [{
      name: '取消关注',
    }],
    openFriendId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type = options.type;
    this.setData({
      current: type
    });
    this.loadList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.loadList();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  loadList: function() {
    var url = "";
    if (this.data.current == "following") {
      url = api.getFriends + app.globalData.user.id;
    } else if (this.data.current == "follower") {
      url = api.getFollowers + app.globalData.user.id;
    }

    network.GET({
      url: url,
      success: res => {
        if (res.success) {
          this.setData({
            list: res.content
          });
        } else {
          wx.showToast({
            title: '查询失败',
            icon: 'none',
            duration: 5000
          })
        }
      }
    });
  },

  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
    this.loadList();
  },

  confirm(e) {
    if (e.detail.value == app.globalData.user.id) {
      $Message({
        content: '不能关注自己噢！',
        type: 'warning'
      });
    } else {
      network.GET({
        url: api.getUser + e.detail.value,
        success: res => {
          if (res.success && res.content) {
            this.fork(res.content.id);
          } else {
            $Message({
              content: '查无此用户！',
              type: 'error'
            });
          }
        }
      });
    }
  },

  forkBtn(e) {
    this.fork(e.target.id);
  },

  fork: function(id) {
    network.POST({
      url: api.followUser,
      data: {
        friendName: "useless",
        friendId: id,
        userId: app.globalData.user.id
      },
      success: res => {
        if (res.success) {
          this.loadList();
          this.setData({
            searchInput: ''
          });
          $Message({
            content: '关注成功!',
            type: 'success'
          });
        } else {
          $Message({
            content: res.message,
            type: 'error'
          });
        }
      }
    });
  },

  cancelForkBtn(e) {
    this.cancelFork(e.target.id);
  },

  cancelFork: function(id) {
    network.POST({
      url: api.cancelFollowUser,
      data: {
        friendId: id,
        userId: app.globalData.user.id
      },
      success: res => {
        if (res.success) {
          this.loadList();
          $Message({
            content: '取消关注成功!',
            type: 'success'
          });
        } else {
          wx.showToast({
            title: '取消关注失败',
            icon: 'none',
            duration: 5000
          })
        }
      }
    });
  },

  handleOpen(e) {
    this.setData({
      visible: true,
      openFriendId: e.target.id
    });
  },

  handleCancel() {
    this.setData({
      visible: false
    });
  },

  handleClickItem({
    detail
  }) {
    const index = detail.index + 1;
    if (index == 1) {
      this.cancelFork(this.data.openFriendId);
    }

    this.setData({
      visible: false
    });
  }
})