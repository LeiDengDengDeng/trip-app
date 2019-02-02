const network = require("../../utils/network.js")
const {
  api
} = require("../../utils/config.js")
const app = getApp()
// pages/team/establish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datePickerValue: ['', '', ''],
    datePickerIsShow: false,
    current: 'start',
    spot: '',
    id: 0,
    name: '',
    description: ''
  },
  changeData: function(name, spotId) {
    this.setData({
      spot: name,
      id: spotId
    })
  },
  handleChangeName({
    detail
  }) {

    this.setData({
      name: detail.detail.value
    })
  },
  handleChangeIntro({
    detail
  }) {
    this.setData({
      description: detail.detail.value
    })
  },
  handleChangeMoney({
    detail
  }) {
    this.setData({
      money: detail.detail.value
    })
  },
  handleChangeMin({
    detail
  }) {
    this.setData({
      minimumLimit: detail.detail.value
    })
  },
  handleChangeMax({
    detail
  }) {
    this.setData({
      maximumLimit: detail.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var currentDateLong = Date.parse(new Date(year, month, day));
    this.setData({
      startTime: `${year}年${month}月${day}日`,
      endTime: `${year}年${month}月${day}日`,
      startLong: currentDateLong,
      endLong: currentDateLong,
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
  showDatePicker: function(e) {
    // this.data.datePicker.show(this);
    this.setData({
      datePickerIsShow: true,
      current: e.target.id
    });
  },

  datePickerOnSureClick: function(e) {
    console.log('datePickerOnSureClick');
    console.log(e);
    var date = new Date(e.detail.value[0], e.detail.value[1], e.detail.value[2]);
    var currentDateLong = Date.parse(date);
    if (this.data.current == "start") {
      this.setData({
        startTime: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        startLong: currentDateLong
      });
    } else {
      this.setData({
        endTime: `${e.detail.value[0]}年${e.detail.value[1]}月${e.detail.value[2]}日`,
        endLong: currentDateLong
      });
    }
    this.setData({
      datePickerValue: e.detail.value,
      datePickerIsShow: false,
    });
  },

  datePickerOnCancelClick: function(event) {
    console.log('datePickerOnCancelClick');
    console.log(event);
    this.setData({
      datePickerIsShow: false,
    });
  },
  establish: function(event) {
    if (app.globalData.user.state != "CHECKED") {
        wx.showToast({
          title: '未审核通过，请先审核',
          icon: 'none',
          duration: 2000
        });
      return;
    };
    var type = this.data.type;
    var data = {};
    console.log(app.globalData)
    data.leaderId = app.globalData.user.id;
    data.name = this.data.name;
    data.minimumLimit = this.data.minimumLimit;
    data.maximumLimit = this.data.maximumLimit;
    data.average = this.data.money;
    data.intro = this.data.description;
    data.scenicId = this.data.id;
    data.startTime = this.data.startLong / 1000;
    data.endTime = this.data.endLong / 1000;
    console.log(data)
    console.log(this.data.startLong)
    if (data.name == '') {
      wx.showToast({
        title: '队伍名称不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (data.intro == '') {
      wx.showToast({
        title: '简介不能为空',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    network.POST({
      url: api.establishTeam,
      data: data,
      success: res => {
        if (res.success) {
          setTimeout(() => {
            wx.showToast({
              title: '创建成功',
              icon: 'success',
              duration: 2000
            });
          }, 500);
          wx.switchTab({
            url: '../schedule/schedule'
          });
        } else {
          wx.showToast({
            title: '创建失败',
            icon: 'none',
            duration: 5000
          });
        }
      }
    })
  }
})