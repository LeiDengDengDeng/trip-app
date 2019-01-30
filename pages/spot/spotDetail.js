const { $Message } = require('../../dist/base/index');
const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
    current: 'tab1',
    isForked: false,
    starNum: 3,
    emptyStarNum: 1,
    halfStar: true,
    imgUrls: [{
      // link: '/pages/spot/spot',
      url: '/utils/imgs/1.jpeg'
    }, {
      // link: '/pages/index/index',
      url: '/utils/imgs/2.jpeg'
    }, {
      // link: '/pages/index/index',
      url: '/utils/imgs/3.jpeg'
    }],
    indicatorDots: true, //小点
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 2000 //滑动时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    network.GET({
      url: api.getSpot + id,
      success: res => {
        if (res.success) {
          var starNum = Math.floor(res.content.star);
          var emptyStarNum = 5 - starNum;
          var halfStar = false;
          if (res.content.comment_star - starNum > 0) {
            halfStar = true;
            emptyStarNum--;
          }

          this.setData({
            detail: res.content,
            starNum: starNum,
            emptyStarNum: emptyStarNum,
            halfStar: halfStar
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

  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },

  viewLoc: function() {
    wx.openLocation({
      latitude: this.data.detail.latitude,
      longitude: this.data.detail.longitude,
      scale: 14,
      name: this.data.detail.name,
      address: this.data.detail.address
    })
  },

  clickFork: function() {
    this.setData({
      isForked: !this.data.isForked
    });
    if (this.data.isForked) {
      this.forkSpot(api.forkSpot, "收藏成功！","success");
    } else {
      this.forkSpot(api.cancelForkSpot, "已取消收藏！", "default");
    }
  },

  forkSpot: function (url,message,type) {
    network.POST({
      url: url,
      data: {
        scenicId: this.data.detail.id,
        userId: app.globalData.user.id
      },
      success: res => {
        if (res.success) {
          $Message({
            content: message,
            type: type
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
})