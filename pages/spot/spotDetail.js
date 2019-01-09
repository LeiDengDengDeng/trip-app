const { $Message } = require('../../dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      latitude: 32.053552,
      longitude: 118.780052,
      scale: 14,
      name: "南京大学鼓楼校区",
      address: "汉口路22号"
    })
  },

  clickFork: function() {
    this.setData({
      isForked: !this.data.isForked
    });
    if (this.data.isForked) {
      $Message({
        content: '收藏成功！',
        type: 'success'
      });
    } else {
      $Message({
        content: '已取消收藏！'
        // type: 'warning'
      });
    }
  }
})