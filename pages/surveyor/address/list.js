import {
    parseTime
} from './../../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        hasMore: true,
        isLoading: true,
    },


    page: 1,
    async getData() {
        const res = await wx.$api.getAddressList({
            pageNum: this.page,
            userId: this.data.userId
        })

        if (res.code === 200) {
            const list = res.rows.map(it => {
                return {
                    ...it,
                    time: parseTime(new Date(it.endTime))
                }
            })
            this.setData({
                hasMore: res.rows.length >= 10,
                isLoading: false,
                list: this.page == 1 ? list : this.data.list.concat(list)
            });
        }
    },

    async getUserInfo() {
        const res = await wx.$api.getUserInfo();
        if (res.code == 200) {
            this.setData({
                isSurveyor: (res.user.roles.map(it => it.roleKey) || []).includes('surveyor'),
                userId: res.user.userId
            })
            this.getData()
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getUserInfo()
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
            this.page++;
            this.getData();
        }
    }
})