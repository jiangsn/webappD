//index.js
//获取应用实例
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'AUUBZ-GFOW5-4Y5IX-QBDUO-PMQZH-Y6BLW'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {

    up: '',
    show: false,
    mask: '',
    longitude: '',
    latitude: '',
    result:''
  },

  up: function() {
    this.setData({
      mask: 'mask',
      show: true,
      up: true
    })
  },

  down: function() {
    this.setData({
      show: true,
      up: false,
      mask: '',
    })

  },
  destroyBlock: function() {
    if (!this.data.up) {
      this.setData({
        show: false,
      })
    }
  },

  backfill: function (e) {
        var id = e.currentTarget.id;
    console.log(id)
        for (var i = 0; i < this.data.suggestion.length; i++) {
            if (i == id) {
                this.setData({
                    backfill: this.data.suggestion[i].title
                });
            }
        }
    },
  getsuggest: function(e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function(res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
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
   * 生命周期函数--监听页面显t= 
   */
  onShow: function() {
    var _this = this;
    var lat = "";
    var lot = "";
    wx.getLocation({
      type:'gcj02',
      success: function (res) {  //异步的
       lat = res.latitude,
         lot = res.longitude,
         console.log(lot)
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        
        qqmapsdk.reverseGeocoder({
        
          location: {
            latitude: _this.data.latitude,
            longitude: _this.data.longitude
          },
          success: function (res) {
            console.log(res)
            _this.setData({
              result:res.result
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
      },
    })
    console.log(lot)
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function(e) {

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

  }
})