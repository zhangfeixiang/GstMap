// pages/surveyor/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            "standardName": "",
            "type": "",
            "county": "房山区",
            "street": "",
            "community": "",
            "longitude": 0,
            "latitude": 0,
            "isHouseTable": 0,
            "road": "",
            "houseNo": "",
            "placeName": "",
            "aoiParent": "",
            "aoiChild": "",
            "building": "",
            "boardImg": "",
            "imgUrl": "",
            remarks: ""
        },
        streetItems: [{
            text: "房山区",
            children: [{
                    text: "城关街道"
                },
                {
                    text: "新镇街道"
                },
                {
                    text: "向阳街道"
                },
                {
                    text: "东风街道"
                },
                {
                    text: "迎风街道"
                },
                {
                    text: "星城街道"
                },
                {
                    text: "拱辰街道"
                },
                {
                    text: "西潞街道"
                },
                {
                    text: "阎村镇"
                },
                {
                    text: "窦店镇"
                },
                {
                    text: "石楼镇"
                },
                {
                    text: "长阳镇"
                },
                {
                    text: "河北镇"
                },
                {
                    text: "长沟镇"
                },
                {
                    text: "大石窝镇"
                },
                {
                    text: "张坊镇"
                },
                {
                    text: "十渡镇"
                },
                {
                    text: "青龙湖镇"
                },
                {
                    text: "韩村河镇"
                },
                {
                    text: "良乡镇"
                },
                {
                    text: "周口店镇"
                },
                {
                    text: "琉璃河镇"
                },
                {
                    text: "霞云岭乡"
                },
                {
                    text: "南窖乡"
                },
                {
                    text: "佛子庄乡"
                },
                {
                    text: "大安山乡"
                },
                {
                    text: "史家营乡"
                },
                {
                    text: "蒲洼乡"
                },
            ]
        }],
        showPopupStreet: false
    },

    onChangeType(e) {
        this.setData({
            "userInfo.type": e.detail,
        });
    },

    onShowPopupStreet() {
        this.setData({
            showPopupStreet: true
        })
    },

    onClosePopupStreet() {
        this.setData({
            showPopupStreet: false
        })
    },

    onClickNav() {},
    onClickStreet(e) {
        this.setData({
            "userInfo.street": e.detail.text,
            showPopupStreet: false
        })
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