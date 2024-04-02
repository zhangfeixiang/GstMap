// pages/standard-map/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filterIndex: 0,
        hotFilterBars: ["全区域", "朝阳", "海淀", "海淀", "海淀", "海淀", "海淀", "海淀", "海淀"],
        list: [{
            id: 1,
            scale: "比例尺：1:22万",
            county: "海淀",
            year: "2025年版",
            cover: "https://gd-hbimg.huaban.com/706f0059812fb1f0ef5213557f59feab9593e71c12093a-LEWZKa_fw1200webp",
            title: "城市绿心森林公园",
            subTit: "通州"
        }, {
            id: 1,
            scale: "比例尺：1:22万",
            county: "朝阳",
            year: "2025年版",
            cover: "https://gd-hbimg.huaban.com/706f0059812fb1f0ef5213557f59feab9593e71c12093a-LEWZKa_fw1200webp",
            title: "城市绿心森林公园",
            subTit: "通州"
        }, {
            id: 1,
            scale: "比例尺：1:22万",
            county: "朝阳",
            year: "2025年版",
            cover: "https://gd-hbimg.huaban.com/706f0059812fb1f0ef5213557f59feab9593e71c12093a-LEWZKa_fw1200webp",
            title: "城市绿心森林公园",
            subTit: "通州"
        }, {
            id: 1,
            scale: "比例尺：1:22万",
            county: "朝阳",
            year: "2025年版",
            cover: "https://gd-hbimg.huaban.com/706f0059812fb1f0ef5213557f59feab9593e71c12093a-LEWZKa_fw1200webp",
            title: "城市绿心森林公园",
            subTit: "通州"
        }]
    },
    handleClickFilterItem(e) {
        const {
            index
        } = e.currentTarget.dataset;
        this.setData({
            filterIndex: index,
        })
        this.initFilterList()
    },

    initFilterList() {
        const county = this.data.hotFilterBars[this.data.filterIndex];
        const filterList = this.data.list.filter(it => {
            if (county === '全区域') {
                return true
            }
            return it.county === county;
        })
        this.setData({
            filterList
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.initFilterList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})