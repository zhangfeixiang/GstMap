// pages/surveyor/tourismPanel/list.js
import {
    parseTime
} from './../../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        user: {},
        hasMore: true,
        isLoading: true,
    },
    async getUserData() {
        const res = await wx.$api.getUserInfo();
        if (res.code == 200) {
            this.setData({
                user: res.user
            })
            this.getData()
        }
    },
    page: 1,
    async getData() {
        const res = await wx.$api.getTravelResList({
            userId: this.data.user.userId,
            pageNum: this.page,
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.page = 1;
        this.getUserData();
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
            this.getData();
        }
    }
})