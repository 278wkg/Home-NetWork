// pages/menu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuType:[],
    food:[],
    activeIndex:0,
    selecteId:"item0",
    isShowMinusAndCount:false,
    showBack:false,
    cartFoodList:[],
    countSum:0
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.fastmock.site/mock/13a4350dede49d0cc9fb656c66553ca6/min/menuType',
      success: result=>{
        this.setData({
          menuType: result.data.menuType
        })
      }
    }),
    wx.request({
      url: 'https://www.fastmock.site/mock/13a4350dede49d0cc9fb656c66553ca6/min/food',
      success:result=>{
        this.setData({
          food:result.data.food
        })
      }
    })
  },

  choosen:function(e){
    this.data.activeIndex = e.currentTarget.dataset.idx;
    //右边滚动效果
    this.data.selecteId = "item" + this.data.activeIndex;
    this.setData({
      activeIndex: this.data.activeIndex,
      selecteId: this.data.selecteId
    })
  },

  jia:function(e){
    let index = e.currentTarget.dataset.idx;
    this.data.food[index].count++;
    this.setData({
      // isShowMinusAndCount: this.data.isShowMinusAndCount,
      food: this.data.food
    })
    //购物车
    if (!this.data.cartFoodList.includes(this.data.food[index])) {
      this.data.cartFoodList.unshift(this.data.food[index])
    }
    this.setData({
      // isShowMinusAndCount: this.data.isShowMinusAndCount,
      cartFoodList: this.data.cartFoodList
    });
    this.calcSum();
  },

  jian: function (e) {  
    let index = e.currentTarget.dataset.idx;
    this.data.food[index].count--;
    //购物车
    if (this.data.food[index].count == 0) {
      let idx = this.data.cartFoodList.indexOf(this.data.food[index]);
      this.data.cartFoodList.splice(idx,1)
    }
    this.setData({
      // isShowMinusAndCount: this.data.isShowMinusAndCount,
      food: this.data.food,
      cartFoodList: this.data.cartFoodList
    });
    this.calcSum();
  }, 
  balance(){
    this.setData({
      showBack:!this.data.showBack
    });
  },
  cartJian(e){
    let index = e.currentTarget.dataset.idx;
    this.data.cartFoodList[index].count--;
    //购物车
    if (this.data.cartFoodList[index].count < 1) {
      let idx = this.data.cartFoodList.indexOf(this.data.cartFoodList[index]);
      this.data.cartFoodList.splice(idx, 1)
    }
    this.setData({
      // isShowMinusAndCount: this.data.isShowMinusAndCount,
      food: this.data.food,
      cartFoodList: this.data.cartFoodList
    });
    this.calcSum();
  },
  cartJia(e) {
    let index = e.currentTarget.dataset.idx;
    this.data.cartFoodList[index].count++;
    this.setData({
      // isShowMinusAndCount: this.data.isShowMinusAndCount,
      food: this.data.food,
      cartFoodList: this.data.cartFoodList
    });
    this.calcSum();
  },
  calcSum(){
    let sum = 0;
    for (var i = 0; i < this.data.cartFoodList.length;i++){
      sum = sum + this.data.cartFoodList[i].price * this.data.cartFoodList[i].count;
    }
    this.setData({
     countSum: sum
    })
  },
  pay(){
    if (this.data.countSum == 0){
      wx.showToast({
        title: '您还未选择商品',
      })
      return;
    }
    wx.navigateTo({
      url: '../pay/pay?data='+JSON.stringify(this.data.cartFoodList),
    })
  },
  empty(){
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