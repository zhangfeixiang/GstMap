// pages/surveyor/tourismPanel.js
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
        autosize: {
            maxHeight: 100,
            minHeight: 40
        },
        locationStr: "",
        showPopupStreet: false,
        showPopupType: false,
        resTree: [],
        photoFileList: [],
        videoFileList: [],
        mainActiveIndex: 0,
        activeNames: [],
        fieldCustom: {
            text: 'name',
            value: 'id',
            children: 'children',
        },
        isSubmiting: false,
        streetId: null,
        // --------------
        code: "",
        name: "",
        "type": 0,
        typeName: "",
        city: "北京市",
        county: "",
        street: "",
        longitude: "",
        latitude: "",
        feature: "",
        officeLevel: "",
        preservationStatus: "",
        openStatus: "",
        isNew: null,
        "internalOrOtherRemark": "",
        "isDeveloped": 0,
        "developedType": 0,
        scenicName: "",
        scenicLevel: "",
        subjectionScenicName: "",
        subjectionScenicLevel: "",
        "touristNumber": 0,
        protectionAndDevelopRemark: "",
        preservationMeasureStatus: "",
        externalRoadStatus: "",
        neighborCity: "",
        neighborCityDistance: "",
        neighborDistributingCentre: "",
        neighborDistributingCentreDistance: "",
        neighborTouristArea: "",
        neighborTouristAreaDistance: "",
        neighborOtherRemark: "",
        imageUrl: "",
        videoUrl: "",
        "censusUserId": 0,
        censusUserName: "",
        remark: "",
        documents: [],
        // ----------
    },

    async initMatedata() {
        const promise = [
            "getExternalRoadStatus",
            "getTravelResTree",
            "districtTree",
            "getState",
            "getSaveState",
            "getProtective",
        ];
        const apisPromise = promise.map(async key => {
            return wx.$api[key]();
        })
        const resList = await Promise.all(apisPromise);
        const [externalRoadStatusData, resTree, districtTree, statusData, savestatusData, protectiveData] = resList.map(it => {
            if (it.code === 200) {
                return it.data
            } else {
                return []
            }
        })
        // resTree, districtTree, statusData, savestatusData, protectiveData
        deepTree(districtTree, 'name', 'code')
        this.setData({
            externalRoadStatusData,
            resTree,
            districtTree: districtTree[0].children,
            statusData,
            savestatusData,
            protectiveData
        })
    },

    async initData() {
        if (!this.options.id) return;
        const formData = await wx.$api.getTravelItem({}, this.options.id);
        if (formData.code === 200) {
            formData.imageUrl && formData.imageUrl.split(',').forEach(e => {
                this.data.photoFileList.push({
                    status: 'success',
                    message: '',
                    url: e,
                })
            })
            formData.videoUrl && formData.videoUrl.split(',').forEach(e => {
                this.data.videoFileList.push({
                    status: 'success',
                    message: '',
                    url: e,
                })
            })
            this.setData({
                ...formData.data,
                photoFileList: this.data.photoFileList,
                videoFileList: this.data.videoFileList,
                locationStr: `${formData.data.longitude},${formData.data.latitude}`
            })
        }
    },


    // 表单提交
    async handleFormSubmit() {
        const photoList = await uploadFileAll(this.data.photoFileList);
        const videoList = await uploadFileAll(this.data.videoFileList);
        this.setData({
            photoFileList: photoList,
            videoFileList: videoList
        })
        const data = {
            ...this.data,
            isNew: this.data.isNew ? Number(this.data.isNew) : null,
            imageUrl: photoList.map(it => it.url).join(','),
            videoUrl: videoList.map(it => it.url).join(','),
        };

        delete data.autosize;
        delete data.locationStr;
        delete data.showPopupStreet;
        delete data.showPopupType;
        delete data.resTree;
        delete data.photoFileList;
        delete data.videoFileList;
        delete data.items;
        delete data.mainActiveIndex;
        delete data.activeNames;
        delete data.fieldCustom;
        delete data.isSubmiting;
        delete data.externalRoadStatusData;
        delete data.resTree;
        delete data.districtTree;
        delete data.statusData;
        delete data.savestatusData;
        delete data.protectiveData;
        const res = await wx.$api.getTravelResources(data);
        console.log(res)
        if (res.code === 200) {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
        }

    },

    onChangeNewRadio(e) {
        this.setData({
            isNew: e.detail
        })
    },

    handleInputDocuments(e) {
        const {
            index,
            key
        } = e.currentTarget.dataset;
        this.data.documents[index][key] = e.detail;
        this.setData({
            documents: this.data.documents
        })
    },

    onChange(e) {
        this.setData({
            activeNames: e.detail
        })
    },

    onChooseExternalRoadStatus(e) {
        const itemList = this.data.externalRoadStatusData;
        wx.showActionSheet({
            itemList,
            success: res => {
                this.setData({
                    'externalRoadStatus': itemList[res.tapIndex]
                })
            }
        })
    },
    onChooseSaveStatus(e) {
        const itemList = this.data.savestatusData;
        wx.showActionSheet({
            itemList,
            success: res => {
                this.setData({
                    'preservationStatus': itemList[res.tapIndex]
                })
            }
        })
    },
    onChooseOpenStatus(e) {
        const itemList = this.data.statusData;
        wx.showActionSheet({
            itemList,
            success: res => {
                this.setData({
                    'openStatus': itemList[res.tapIndex]
                })
            }
        })
    },
    onChooseProtective(e) {
        const itemList = this.data.protectiveData;
        wx.showActionSheet({
            itemList,
            success: res => {
                this.setData({
                    'preservationMeasureStatus': itemList[res.tapIndex]
                })
            }
        })

    },
    // 是否已开发
    onChangeDeveloped(e) {
        this.setData({
            'isDeveloped': e.detail
        })
    },
    onChangeDevelopedType(e) {
        console.log('change: ', e);
    },
    onClickDevelopedType(e) {
        const {
            name
        } = e.currentTarget.dataset;
        this.setData({
            "developedType": Number(name)
        })
    },
    async onGetLocation() {
        const target = this.data.longitude && this.data.latitude ? {
            longitude: DMSToDecimal(this.data.longitude),
            latitude: DMSToDecimal(this.data.latitude),
        } : {};
        const res = await wx.chooseLocation(target);

        const dms = [decimalToDMS(res.longitude), decimalToDMS(res.latitude)]
        this.setData({
            locationStr: dms.join(','),
            "longitude": dms[0],
            "latitude": dms[1]
        })
        console.log(this.data.locationStr, res)
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
    onShowPopupType() {
        this.setData({
            showPopupType: true
        })
    },

    onClosePopupType() {
        this.setData({
            showPopupType: false
        })
    },

    onFinishType(e) {
        console.log(e.detail)

        const {
            selectedOptions,
            tabIndex
        } = e.detail;
        const last = selectedOptions.slice(-1)[0];
        if (last) {
            this.setData({
                // TODO：换成value
                'type': last.id,
                'typeName': last.name,
                showPopupType: false
            })
        }
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
    handleChangePhotoUpload(e) {
        console.log(e.detail);
        this.setData({
            photoFileList: e.detail
        })
    },
    handleChangeVideoUpload(e) {
        console.log(e.detail);
        this.setData({
            videoFileList: e.detail
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.initMatedata();
        this.initData()
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