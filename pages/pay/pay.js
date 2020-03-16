// pages/pay/pay.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartFoodList:[],
    userInfo:{},
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */ 
  onLoad: function (options) {
    let _this = this;
    this.data.cartFoodList = JSON.parse(options.data)
    this.data.userInfo = app.globalData.userInfo
    wx.getLocation({
      success: function(res) {
        console.log(res)
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=',
          data:{
            location:`${res.latitude},${res.longitude}`,
            key:"RKOBZ-OFQRW-KU3RD-R5GEE-GZO35-QWBB4"
          },
          success(address){
            console.log(address.data.result.address)
            _this.setData({
              address: address.data.result.address
            })
          }
        })
      },
    })
    this.setData({
      cartFoodList : this.data.cartFoodList,
      userInfo:this.data.userInfo
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