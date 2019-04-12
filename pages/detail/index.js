const interfaces = require('../../utils/urlconfig')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        partData: {},
        baitiao: [],
        baitiaoSelectItem: {
            desc: "【白条支付】首单享立减优惠"
        },
        hideBaitiao: true, // 是否隐藏白条的遮罩
        hideBuy: true, // 是否购买的遮罩
        badgeCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log(options.id);
        const id = options.id;
        const self = this;
        wx.showLoading({
            title: '加载中...'
        })

        wx.request({
            url: interfaces.productionDetail,
            success(res) {
                //console.log(res.data);
                let result = null;

                //若id匹配，则将data赋给result
                res.data.forEach(data => {
                    if (data.partData.id == id) {
                        result = data;
                    }
                })
                self.setData({
                    partData: result.partData,
                    baitiao: result.baitiao
                })
                wx.hideLoading();
            }
        })
    },

    popBaitiaoView() {
        //console.log("显示白条")
        this.setData({
            hideBaitiao: false
        })

    },

    updateSelectItem(e) {
        //console.log(e);
        this.setData({
            baitiaoSelectItem: e.detail
        })
    },

    popBuyView() {
        //console.log("显示已选")
        this.setData({
            hideBuy: false
        })
    },

    updateCount(e) {
        //console.log(e);
        let partData = this.data.partData;
        partData.count = e.detail.val;
        this.setData({
            partData: partData
        })
    },

    addCart() {
        //console.log("加入购物车")
        //先将加入购物车的数据存储到本地，然后在购物车里再显示出来
        //一进来先获取本地存储，看有没有加入购物车，若有，就在原来的数量上增加，若没有，则加入购物车
        let self = this;
        wx.getStorage({
            key: 'cartInfo',
            success: function (res) {
                //查到cartInfo数据，判断数组中是否拥有添加的数组
                //console.log(res.data);
                const cartArray = res.data;
                //拿到现在添加的商品对象
                const partData = self.data.partData;

                let isExit = false;//判断数组是否存在该商品
                //该商品与本地已选商品进行匹配
                cartArray.forEach(cart => {
                    if (cart.id == partData.id) {
                        isExit = true;
                        cart.total += self.data.partData.count;
                        wx.setStorage({
                            key: 'cartInfo',
                            data: cartArray,
                        })
                    }
                })

                if (!isExit) {  //本地存储中不存在该商品
                    partData.total = self.data.partData.count;
                    cartArray.push(partData);
                    wx.setStorage({
                        key: 'cartInfo',
                        data: cartArray,
                    })
                }

                //商品数量
                self.setBadge(cartArray);

            },
            //第一次没有cartInfo时走一次存储的流程
            fail() {
                let partData = self.data.partData;
                //给partData加上一个total属性，这个是用到购物车里面的
                //data.partData中有count
                partData.total = self.data.partData.count;
                //console.log(partData);
                //将拿到的对象加入一个大的数组,当点击购物车时，遍历数组就行
                let cartArray = [];
                cartArray.push(partData);
                wx.setStorage({
                    key: 'cartInfo',
                    data: cartArray,
                })

                //商品数量
                self.setBadge(cartArray);

            }
        }),
            wx.showToast({
                title: "加入购物车成功",
                icon: "success",
                duration: 3000
            })
    },

    //商品数量方法
    setBadge(cartArray) {
        this.setData({
            badgeCount: cartArray.length
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
        const self = this;
        wx.getStorage({
            key: "cartInfo",
            success(res) {
                const cartArray = res.data;
                self.setBadge(cartArray);
            }
        })
    },

    showCartView(){
        wx.switchTab({
            url:'/pages/cart/index'
        })
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