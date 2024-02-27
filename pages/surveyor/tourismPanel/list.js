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
        hasMore: true
    },

    page: 1,
    async getData() {
        const res = await wx.$api.getTravelResList({
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
                list: this.page == 1 ? list : this.data.list.concat(list)
            });
            this.page++
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getData()
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
        this.getData();
    }
})