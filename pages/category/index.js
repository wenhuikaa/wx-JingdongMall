const interfaces = require("../../utils/urlconfig");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navLeftItems: [],
        navRightItems: [],
        curIndex: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const self = this;

        wx.showLoading({
            title: '加载中...'
        })

        wx.request({
            url: interfaces.productions,
            header: {
                "content-type": "application/json"
            },
            success(res) {
                console.log(res.data)
                self.setData({
                    navLeftItems: res.data.navLeftItems,
                    navRightItems: res.data.navRightItems
                })
                wx.hideLoading();
            }
        })
    },

    /**
     * 记录左侧点击的按钮的下标
     */
    switchRightTab(e) {
        console.log(e.currentTarget.dataset.index);
        let index = parseInt(e.currentTarget.dataset.index);
        this.setData({
            curIndex: index
        })
    },

    /**
     * 点击进入列表页
     * 列表页参数title
     */
    showListView(e) {
        console.log(e.currentTarget.dataset.txt);
        let txt = e.currentTarget.dataset.txt
        wx.navigateTo({
            url: '/pages/list/index?title=' + txt
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