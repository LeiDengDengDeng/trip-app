const network = require("../../utils/network.js")
const {
  api
} = require("../../utils/config.js")
const app = getApp()

Page({
  data: {
    cities: []
  },
  
  onChange(event) {
    console.log(event.detail, 'click right menu callback data')
  },
  makeUp: function (content) {
    let storeCity = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeCity[index] = {
        key: item,
        list: []
      }
    })
    console.log(this.data.cities)
    var cities=content;
    cities.forEach((item) => {
      let firstName = item.pinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeCity[index].list.push({
        name: item.name,
        key: firstName,
        id: item.id
      });
    })
    this.data.cities = storeCity;
    this.setData({
      cities: this.data.cities
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    network.GET({
      url: api.getSpots,
      success: res => {
        if (res.success) {
          for (let item of res.content) {
            if (item.introduction.length > 20) {
              item.introduction = item.introduction.substring(0, 20) + "……";
            }
          }
          this.makeUp(res.content);
          console.log(this.data.cities);
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
  getSpot: function(event) {
    var pages = getCurrentPages();
    if (pages.length > 1) {
      var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
      console.log(event)
       beforePage.changeData(event._relatedInfo.anchorTargetText,event.target.id)
      // 上一页面刷新然后返回
      wx.navigateBack({
        delta: 1
      });
    }
  }
});