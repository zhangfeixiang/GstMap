// pages/products/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hasMore: true,
        list: [{
            url: "detail?url=https%3A%2F%2Fflbook.com.cn%2Fc%2FdC9HfJTcql%23page%2F1",
            cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp",
            title: "2022年北京影像图集",
            desc: "包含北京全市域及各城区",
            date: "发布时间：2021-09-10",
            tag: "影像图"
        }, {
            url: "detail?url=https%3A%2F%2Fstatic.zc0901.com%2Fzfx%2Fgst-map%2Fmap%2Findex.html",
            cover: "https://gd-hbimg.huaban.com/54b1860b14994a3791938341952f3528a4dede65212b4-NyM9Gk_fw480webp",
            title: "2022年北京影像图集",
            desc: "包含北京全市域及各城区",
            date: "发布时间：2021-09-10",
            tag: "影像图"
        }]
    },
    goDetail(e) {
        const item = this.data.list[e.currentTarget.dataset.index];
        console.log(item)
        wx.navigateTo({
            url: `detail?url=${encodeURIComponent(this.data.$host + item.path)}`,
        })
    },
    page: 1,
    async getList() {
        const res = await wx.$api.getProductsList({
            pageSize: 10,
            pageNum: this.page || 1
        });
        if (res.code === 200) {
            this.setData({
                hasMore: res.rows.length >= 10,
                list: this.page === 1 ? res.rows : this.data.list.concat(res.rows),
            })
        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getList()
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
        if (this.data.hasMore) {
            this.page++
            this.getList()
        }
    }
})