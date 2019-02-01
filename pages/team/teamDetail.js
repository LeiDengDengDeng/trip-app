const {
  $Toast
} = require('../../dist/base/index');
const {
  $Message
} = require('../../dist/base/index');
const network = require("../../utils/network.js")
const {
  api
} = require("../../utils/config.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: '',
    members: '',
    current: 'tab1',
    isNotJoined: true,
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
      url: api.getTeam + id,
      success: res => {
        if (res.success) {
          var dateStart = new Date(res.content.startTime * 1000);
          res.content.startTime = dateStart.getFullYear() + '年' + dateStart.getMonth() + 1 + '月' + dateStart.getDay() + '日';
          var dateEnd = new Date(res.content.endTime * 1000);
          res.content.endTime = dateEnd.getFullYear() + '年' + dateEnd.getMonth() + 1 + '月' + dateEnd.getDay() + '日';
          this.setData({
            detail: res.content,
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
    network.GET({
      url: api.getTeamMember + id,
      success: res => {
        if (res.success) {
          for (let item of res.content) {
            if (app.globalData.user.id == res.content.id) {
              this.setData({
                isNotJoined: false,
              });
              break;
            }
          }
          this.setData({
            members: res.content,
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
  join: function() {
    if (this.data.isNotJoined) {
      var data = {};
      data.teamId = this.data.detail.id;
      data.userId = app.globalData.user.id;
      network.POST({
        url: api.joinTeam,
        data: data,
        success: res => {
          if (res.success) {
            wx.redirectTo({
              url: '../schedule/schedule'
            })
            setTimeout(() => {
              $Toast({
                content: '加入成功',
                type: 'success'
              });
            }, 500);

          } else {
            $Toast({
              content: '加入失败',
              type: 'fail'
            });
          }
        }
      })
      
    } else {
      $Toast({
        content: '已成功退出',
        type: 'success'
      });
    }
    this.setData({
      isNotJoined: !this.data.isNotJoined
    });

  }


})