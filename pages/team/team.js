// pages/team/team.js
const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    current_scroll: 'tab1',
    list: [],
  },

  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },

  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
    });
  },
  update:function(){
    this.onLoad();
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
    network.GET({
      url: api.getTeams,
      success: res => {
        if (res.success) {
          for (let item of res.content) {
            if (item.intro.length > 20) {
              item.intro = item.intro.substring(0, 20) + "……";
            }
            var date = new Date(item.startTime * 1000);
            item.startTime = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日';
          }
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
  onPullDownRefresh: function () {
    this.onShow();
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

  }
})