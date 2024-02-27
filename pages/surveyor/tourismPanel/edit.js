// pages/surveyor/tourismPanel.js
import {
    items,
} from './../../../mock/items'

import {
    decimalToDMS,
    DMSToDecimal
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
        items: items,
        mainActiveIndex: 0,
        activeNames: [],
        fieldCustom: {
            text: 'name',
            value: 'id',
            children: 'children',
        },
        isSubmiting: false,
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
        status: "",
        isNew: null,
        "internalOrOtherRemark": null,
        "isDeveloped": 0,
        "developedType": 0,
        scenicName: "",
        scenicLevel: "",
        subjectionScenicName: "",
        subjectionScenicLevel: "",
        "touristNumber": 0,
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

    // 表单提交
    async handleFormSubmit() {
        let photoFliterArr = this.data.photoFileList.filter(it => it.status === "success").map(it => {
            return it.url.data.url
        })
        let videoFliterArr = this.data.videoFileList.filter(it => it.status === "success").map(it => {
            return it.url.data.url
        })
        const data = {
            ...this.data,
            imageUrl: photoFliterArr.join(','),
            videoUrl: videoFliterArr.join(',')
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
        const res = await wx.$api.getTravelResources(data);
        console.log(res)
        if (res.code === 200) {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
        }

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
    onChooseStatus(e) {
        const itemList = this.data.statusData;
        wx.showActionSheet({
            itemList,
            success: res => {
                this.setData({
                    'status': itemList[res.tapIndex]
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
            "developedType": name
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
            "county": e.detail.parentId,
            "street": e.detail.text,
            showPopupStreet: false
        })
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

        this.setData({
            externalRoadStatusData,
            resTree,
            districtTree,
            statusData,
            savestatusData,
            protectiveData
        })
    },

    async initData() {
        const formData = await wx.$api.getTravelItem({}, this.options.id);
        if (formData.code === 200) {
            this.setData({
                ...formData.data,
                locationStr: `${formData.data.longitude},${formData.data.latitude}`
            })
        }
    },

    /**
     * 读取视频后
     */
    async handleAfterReadVideo(event) {
        wx.showLoading({
            title: '上传中',
        })
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.detail.file);
        const videoFileList = this.data.videoFileList
        let fileListLen = videoFileList.length;
        lists.map((item) => {
            videoFileList.push({
                ...item,
                status: 'uploading',
                message: '上传中',
            });
        });
        for (let i = 0; i < lists.length; i++) {
            const result = await this.uploadFilePromise(lists[i].url);
            let item = videoFileList[fileListLen];
            videoFileList.splice(fileListLen, 1, {
                ...item,
                status: 'success',
                message: '',
                url: JSON.parse(result),
            });
            fileListLen++;
        }
        wx.hideLoading()
        this.setData({
            videoFileList
        })
    },
    /**
     * 读取照片后
     */
    async handleAfterReadPhoto(event) {
        wx.showLoading({
            title: '上传中',
        })
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        console.log(event)
        let lists = [].concat(event.detail.file);
        const photoFileList = this.data.photoFileList;
        let fileListLen = photoFileList.length;
        lists.map((item) => {
            photoFileList.push({
                ...item,
                status: 'uploading',
                message: '上传中',
            });
        });
        for (let i = 0; i < lists.length; i++) {
            const result = await this.uploadFilePromise(lists[i].url);
            let item = photoFileList[fileListLen];
            photoFileList.splice(fileListLen, 1, {
                ...item,
                status: 'success',
                message: '',
                url: JSON.parse(result),
            });
            fileListLen++;
        }
        this.setData({
            photoFileList
        })
        wx.hideLoading()
    },
    uploadFilePromise(url) {
        return new Promise((resolve, reject) => {
            let a = wx.uploadFile({
                url: 'https://www.gistoyou.com.cn:8443/applet/common/upload',
                filePath: url,
                name: 'file',
                formData: {
                    // user: 'test',
                },
                success: (res) => {
                    const resData = JSON.parse(res.data)
                    if (resData.code == 200) {
                        resolve(res.data);
                    } else {
                        wx.showToast({
                            title: '上传失败',
                            icon: 'none'
                        })
                        console.error(new Error(resData.msg));
                        reject()
                    }
                },
                complete: () => {

                }
            });
        });
    },

    handleDeletePic(e) {
        this.data.photoFileList.splice(e.detail.index, 1)
        this.setData({
            photoFileList: this.data.photoFileList
        })
    },
    handleDeleteVideo(e) {
        this.data.videoFileList.splice(e.detail.index, 1)
        this.setData({
            videoFileList: this.data.videoFileList
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