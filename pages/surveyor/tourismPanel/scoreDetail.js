// pages/surveyor/tourismPanel/scoreDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 0,
        activeNames: [],
        list: [{
            name: "观赏游憩使用价值（30分）",
            key: "scoreLandscape",
            value: 0,
            min: 1,
            max: 30,
            list: ["全部或其中一项具有极高的观赏价值、游憩价值、使用价值。	32－22", "全部或其中一项具有很高的观赏价值、游憩价值、使用价值。	21－13", "全部或其中一项具有较高的观赏价值、游憩价值、使用价值。	12－6", "全部或其中一项具有一般观赏价值、游憩价值、使用价值。	5-1"]
        }, {
            name: "历史文化科学艺术价值（25分）",
            key: "scoreHumanity",
            value: 0,
            min: 1,
            max: 25
        }, {
            name: "珍稀奇特程度（15分）",
            key: "scoreScarce",
            value: 0,
            min: 1,
            max: 15
        }, {
            name: "规模、丰度与几率（10分）",
            key: "scoreScale",
            value: 0,
            min: 1,
            max: 10
        }, {
            name: "完整性（5分）",
            key: "scorePreservationIntegrality",
            value: 0,
            min: 1,
            max: 5
        }, {
            name: "知名度和影响力（10分）",
            key: "scorePopularity",
            value: 0,
            min: 1,
            max: 10
        }, {
            name: "适游期或使用范围（5分）",
            key: "scoreSuitableTime",
            value: 0,
            min: 1,
            max: 5
        }, {
            name: "环境保护与环境安全",
            key: "scoreEnvironment",
            value: 0,
            min: -5,
            max: 3
        }, ]
    },
    onChange(e) {
        this.setData({
            activeNames: e.detail,
        });
    },
    onChangeSlider(e) {
        const total = this.data.list.map(it => it.value).reduce((a, b) => {
            return Number(a) + Number(b);
        }, 0);
        this.setData({
            total
        });
    },
    onDrag(e) {
        this.data.list[e.currentTarget.dataset.index].value = e.detail.value;

        this.setData({
            list: this.data.list,
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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