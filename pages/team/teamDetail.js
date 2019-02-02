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
    isLeader: false,
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
          res.content.startTime = dateStart.getFullYear() + '年' + dateStart.getMonth() + '月' + dateStart.getDate() + '日';
          var dateEnd = new Date(res.content.endTime * 1000);
          var month = dateEnd.getMonth()
          res.content.endTime = dateEnd.getFullYear() + '年' + month + '月' + dateEnd.getDate() + '日';
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
            if (app.globalData.user.id == item.id) {
              this.setData({
                isNotJoined: false,
              });
              if (item.teamIdentity === "LEADER") {
                this.setData({
                  isLeader: true,
                });
              }
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
    if (app.globalData.user.state!="CHECKED"){
      setTimeout(() => {
        $Toast({
          content: '未审核通过，请先审核',
          type: 'failed'
        });
      }, 500);
    return;
    };
    var data = {};
    data.teamId = this.data.detail.id;
    data.userId = app.globalData.user.id;
    if (this.data.isNotJoined) {
      network.POST({
        url: api.joinTeam,
        data: data,
        success: res => {
          if (res.success) {
            setTimeout(() => {
              $Toast({
                content: '加入成功',
                type: 'success'
              });
            }, 500);

          } else {
            $Toast({
              content: '加入失败',
              type: 'failed'
            });
          }
        }
      })

    } else if (this.data.isLeader) {
      network.POST({
        url: api.disbandTeam,
        data: data,
        success: res => {
          if (res.success) {
            setTimeout(() => {
              $Toast({
                content: '解散成功',
                type: 'success'
              });
              var pages = getCurrentPages();
              if (pages.length > 1) {
                var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
                // 上一页面刷新然后返回
                wx.navigateBack({
                  delta: 1
                });
              }
            }, 500);
            
          } else {
            $Toast({
              content: '解散失败',
              type: 'failed'
            });
          }
        }
      })
    } else {
      network.POST({
        url: api.quitTeam,
        data: data,
        success: res => {
          if (res.success) {
            setTimeout(() => {
              $Toast({
                content: '退出成功',
                type: 'success'
              });
            }, 500);

          } else {
            $Toast({
              content: '退出失败',
              type: 'failed'
            });
          }
        }
      })
    }
    this.setData({
      isNotJoined: !this.data.isNotJoined
    });

  }


})