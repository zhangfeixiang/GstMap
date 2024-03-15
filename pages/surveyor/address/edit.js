// pages/surveyor/address.js
import {
    decimalToDMS,
    DMSToDecimal,
    deepTree,
    uploadFileAll
} from './../../../utils/util'
Page({

    /**
     * 页面的初始数据
     */
    data: {

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
        "imageUrl": "",
        // -------------
        photoFileList: [],
        mainActiveIndex: 0,

        isSurveyor: false,
        showPopupStreet: false,
        locationStr: ""
    },

    async onGetLocation() {
        const target = this.data.longitude && this.data.latitude ? {
            longitude: this.data.longitude,
            latitude: this.data.latitude,
        } : {};
        const res = await wx.chooseLocation(target);
        // const dms = [decimalToDMS(res.longitude), decimalToDMS(res.latitude)]
        this.setData({
            "longitude": res.longitude,
            "latitude": res.latitude
        })
        console.log(this.data.locationStr, res)
    },

    handleChangePhotoUpload(e) {
        console.log(e.detail);
        this.setData({
            photoFileList: e.detail
        })
    },

    onChangeType(e) {
        this.setData({
            "type": e.detail,
        });
    },

    onChangeHouseTable(e) {
        this.setData({
            "isHouseTable": e.detail,
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


    onClickNav({
        detail
    }) {
        this.setData({
            mainActiveIndex: detail.index || 0,
        });
    },
    onClickStreet(e) {
        console.log(e.detail)
        this.setData({
            "county": this.data.districtTree[this.data.mainActiveIndex].text,
            "street": e.detail.text,
            "streetId": e.detail.id,
            showPopupStreet: false
        })
    },

    async initMatedata() {
        const promise = [
            "districtTree",
        ];
        const apisPromise = promise.map(async key => {
            return wx.$api[key]();
        })
        const resList = await Promise.all(apisPromise);
        const [districtTree] = resList.map(it => {
            if (it.code === 200) {
                return it.data
            } else {
                return []
            }
        })
        // resTree, districtTree, statusData, savestatusData, protectiveData
        deepTree(districtTree, 'name', 'code')
        this.setData({
            districtTree: districtTree[0].children,
        })
    },

    async initData() {
        if (!this.options.id) return;
        const formData = await wx.$api.getAddressDetail({}, this.options.id);
        if (formData.code === 200) {
            formData.data.imageUrl && formData.data.imageUrl.split(',').forEach(e => {
                this.data.photoFileList.push({
                    status: 'success',
                    message: '',
                    url: this.data.$host + e,
                    fileName: e
                })
            });

            this.setData({
                ...formData.data,
                photoFileList: this.data.photoFileList,
            })
        }
    },


    // 表单提交
    async handleFormSubmit() {
        const photoList = await uploadFileAll(this.data.photoFileList);
        this.setData({
            photoFileList: photoList,
        })
        const data = {
            ...this.data,
            imageUrl: photoList.filter(it => it.status == 'success').map(it => it.fileName).join(','),
        };

        delete data.photoFileList;
        delete data.mainActiveIndex;
        delete data.showPopupStreet;
        delete data.locationStr;
        delete data.districtTree;
        const res = await wx.$api[this.options.id ? 'editAddress' : 'addAddress'](data, this.options.id);
        console.log(res)
        if (res.code === 200) {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
        }

    },
    async getUserInfo() {
        const res = await wx.$api.getUserInfo();
        if (res.code == 200) {
            this.setData({
                isSurveyor: (res.user.roles.map(it => it.roleKey) || []).includes('surveyor')
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.initMatedata()
        this.initData()
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

    }
})