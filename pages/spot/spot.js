const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1'
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '注意',
            showCancel: false,
            confirmText: '授权',
            content: '为了您更好的体验,请先同意授权',
            success: function (res) {
              wx.navigateTo({
                url: '../index/right'
              });
            }
          })
        } else {
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var scope = this;
        // 登录
        wx.login({
          success: res => {
            network.GET({
              url: api.loginsession + "?appid=wx3f65bf08c8984a2d&secret=710c4b8811f2b69b383faf9a4be2d1b0&js_code=" + res.code + "&grant_type=authorization_code",
              success: res2 => {
                network.GET({
                  url: api.login + res2.openid,
                  success: response => {
                    if (response.success) {
                      if (response.content)
                        app.globalData.user = response.content;
                      else {
                        var infoRes = app.globalData;
                        var info = infoRes.userInfo
                        network.POST({
                          url: api.register,
                          data: {
                            username: res2.openid,
                            nickname: infoRes.userInfo.nickName,
                            gender: infoRes.userInfo.gender,
                            avatar: infoRes.userInfo.avatarUrl
                          },
                          success: registerResponse => {
                            if (registerResponse.success == true) {
                              app.globalData.user = registerResponse.content;
                            } else {
                              wx.showToast({
                                title: '注册失败',
                                icon: 'none',
                                duration: 2000
                              })
                            }
                          }
                        })
                      }
                    } else {
                      wx.showToast({
                        title: '登录失败',
                        icon: 'none',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})