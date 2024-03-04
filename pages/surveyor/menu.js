// pages/surveyor/menu.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loading: true,
        list: [{
                id: 1,
                icon: 'https://gd-hbimg.huaban.com/f3b623e0b4c4537979efaf054dd7bf6ffb3d32d4b28f-6mCNAj_fw480webp',
                url: 'place',
                title: '地名登记'
            },
            {
                id: 2,
                icon: 'https://gd-hbimg.huaban.com/9217f66ccf6e2dc8fc14b3604a79db6e00f3092c8289-fpvXIW_fw480webp',
                url: 'address/edit',
                title: '地址'
            },
            {
                id: 3,
                icon: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                url: 'tourismPanel/list',
                title: '文旅'
            },
            {
                id: 4,
                icon: 'https://gd-hbimg.huaban.com/2c31cc465b78f8f9efe4c3911448f4e0f6cb547b661d-OKX9Jw_fw480webp',
                url: 'antique',
                title: '文物'
            }
        ]
    },
    handleClickItem(e) {
        const {
            index
        } = e.currentTarget.dataset;
        wx.navigateTo({
            url: './' + this.data.list[index].url,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            loading: false
        })
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

    }
})