import {
    deepTree,
    decimalToDMS,
    DMSToDecimal,
    uploadFileAll
} from './../../../utils/util'
import {
    gps84_To_Gcj02,
    gcj02_To_Gps84
} from './../../../utils/GPSUtil'
import {
    pinyinUtil
} from './../../../utils/pinyinutil'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "code": "",
        "standardName": "",
        "aliasName": "",
        "romanLetters": "",
        "placeNameType": "",
        "placeNameCategoryId": "",
        "placeNameCategory": "",
        "city": "北京市",
        "county": "",
        "street": "",
        "longitudeSpan": "",
        "latitudeSpan": "",
        "placeNameSign": "",
        "useTime": "",
        "generalSituation": "",
        "imageUrl": "",
        fieldCustom: {
            text: 'name',
            value: 'id',
            children: 'children',
        },
        autosize: {
            maxHeight: 100,
            minHeight: 40
        },
        // 地名类别
        showPopupPlaceNameCategory: false,
        placeCategoriesData: [],
        useTypeData: [],
        locationStr: "",
        photoFileList: [],
        mainActiveIndex: 0,
        streetId: null,
        showPopupStreet: false,
        showPopupCheckStatus: false,
        isSurveyor: false,
        // ---
        "checkStatus": "",
        checkStatusMainActiveIndex: 0,
        checkStatusTree: [{
                text: '规范',
                children: [{
                        text: '已建成',
                        id: '已建成',
                    },
                    {
                        text: '部分建成',
                        id: '部分建成',
                    },
                ],
            },
            {
                text: '未设置',
                children: [{
                        text: '已建成',
                        id: '已建成',
                    },
                    {
                        text: '部分建成',
                        id: '部分建成',
                    },
                    {
                        text: '未建成',
                        id: '未建成',
                    },
                ],
            },
            {
                text: '不一致',
                children: [{
                        text: '通名不一致',
                        id: '通名不一致',
                    },
                    {
                        text: '专名不一致',
                        id: '专名不一致',
                    },
                    {
                        text: '均不一致',
                        id: '均不一致',
                    },
                    {
                        text: '含义相近',
                        id: '含义相近',
                    },
                ],
            },
            {
                text: '不规范',
                children: [{
                    text: '拼写不准确',
                    id: '拼写不准确',
                }, ],
            },
        ]
    },
    onClickNavCheckStatus({
        detail
    }) {
        this.setData({
            checkStatusMainActiveIndex: detail.index || 0,
        });
    },
    onClickCheckStatus(e) {
        console.log(e.detail)
        this.setData({
            "checkStatus": e.detail.text,
            showPopupCheckStatus: false
        })
    },
    onShowPopupCheckStatus() {
        this.setData({
            showPopupCheckStatus: true
        })
    },

    onClosePopupCheckStatus() {
        this.setData({
            showPopupCheckStatus: false
        })
    },

    async getUserInfo() {
        const res = await wx.$api.getUserInfo();
        if (res.code == 200) {
            this.setData({
                isSurveyor: (res.user.roles.map(it => it.roleKey) || []).includes('surveyor')
            })
        }
    },
    handleChangeUpload(e) {
        console.log(e.detail);
        this.setData({
            photoFileList: e.detail
        })
    },

    async onGetLocationArea(e) {
        const {
            key
        } = e.currentTarget.dataset;
        const latitude = this.data[key + 'Latitude']
        const longitude = this.data[key + 'Longitude']
        let target = longitude && latitude ? {
            longitude: DMSToDecimal(longitude),
            latitude: DMSToDecimal(latitude),
        } : {};
        if (target.latitude) {
            const gcj02 = gps84_To_Gcj02(target.longitude, target.latitude);
            target.longitude = gcj02[0]
            target.latitude = gcj02[1]
        }
        const res = await wx.chooseLocation(target);
        if (res) {
            // 小程序获取到坐标是gcj02，需要先转为gps84，再转度分秒
            const gps84 = gcj02_To_Gps84(res.longitude, res.latitude)
            this.setData({
                [key + "Longitude"]: decimalToDMS(gps84[0]),
                [key + "Latitude"]: decimalToDMS(gps84[1])
            })
        }
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

    onChoosePlaceNameType(e) {
        const itemList = this.data.useTypeData;
        wx.showActionSheet({
            itemList,
            success: res => {
                this.setData({
                    'placeNameType': itemList[res.tapIndex]
                })
            }
        })
    },
    // 地名类别
    onFinishPlaceNameCategory(e) {

        const {
            selectedOptions,
        } = e.detail;
        const last = selectedOptions.slice(-1)[0];
        if (last) {
            this.setData({
                'placeNameCategoryId': last.id,
                placeNameCategory: last.name,
                showPopupPlaceNameCategory: false
            })
        }
    },
    onShowPopupPlaceNameCategory() {
        this.setData({
            showPopupPlaceNameCategory: true
        })
    },
    onClosePlaceNameCategory() {
        this.setData({
            showPopupPlaceNameCategory: false
        })
    },
    onChangePlaceNameSign(e) {
        this.setData({
            "placeNameSign": e.detail,
        });
    },
    onChangeUseTime(e) {
        const itemList = [
            '现今地名',
            '历史地名',
            '规划地名',
            '审批地名',
        ];
        wx.showActionSheet({
            itemList,
            success: res => {
                this.setData({
                    "useTime": itemList[res.tapIndex]
                });
            }
        })
    },


    checkFormError() {
        let title = "";
        if (!this.data.standardName) {
            title = '标准名称不能为空'
        } else if (!this.data.romanLetters) {
            title = '罗马字母拼写不能为空'
        } else if (!this.data.placeNameType) {
            title = '地名使用类型不能为空'
        } else if (!this.data.placeNameCategory) {
            title = '地名类别不能为空'
        } else if (!this.data.street) {
            title = '所在行政区划不能为空'
        } else if (!this.data.placeNameSign) {
            title = '请选择地名标志'
        } else if (!this.data.useTime) {
            title = '请选择使用时间'
        } else if (!this.data.checkStatus) {
            title = '请选择核查状态'
        }
        title && wx.showToast({
            title,
            icon: 'none'
        })
        return Boolean(title)
    },
    // 表单提交
    async handleFormSubmit() {
        if (this.checkFormError()) return;
        wx.showLoading({
            title: '上传中',
        })
        const photoList = await uploadFileAll(this.data.photoFileList);
        wx.hideLoading()
        // const videoList = await uploadFileAll(this.data.videoFileList);
        this.setData({
            photoFileList: photoList,
            // videoFileList: videoList
        })
        const data = {
            ...this.data,
            isNew: this.data.isNew ? Number(this.data.isNew) : null,
            imageUrl: photoList.filter(it => it.status == 'success').map(it => it.fileName).join(','),
        };
        if (!data.imageUrl) {
            wx.showToast({
                title: '现场照片不能为空',
                icon: 'none'
            })
            return
        }
        delete data.fieldCustom;
        delete data.showPopupPlaceNameCategory;
        delete data.placeCategoriesData;
        delete data.autosize;
        delete data.useTypeData;
        delete data.locationStr;
        delete data.photoFileList;
        delete data.mainActiveIndex;
        delete data.showPopupStreet;
        delete data.districtTree;
        delete data.checkStatusTree;

        const res = await wx.$api.editPlace({
            ...data,
            status: 2
        });
        console.log(res)
        if (res.code === 200) {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
            wx.navigateBack()
        }

    },


    async initMatedata() {
        const promise = [
            "getUseType",
            "getPlaceCategories",
            "districtTree",
        ];
        const apisPromise = promise.map(async key => {
            return wx.$api[key]();
        })
        const resList = await Promise.all(apisPromise);
        const [useTypeData, placeCategoriesData, districtTree] = resList.map(it => {
            if (it.code === 200) {
                return it.data
            } else {
                return []
            }
        })
        deepTree(districtTree, 'name', 'code')
        this.setData({
            useTypeData,
            placeCategoriesData,
            districtTree: districtTree[0].children,
        })
    },

    async initData() {
        if (!this.options.id) return;
        const formData = await wx.$api.getPlaceDetail({}, this.options.id);
        if (formData.code === 200) {
            formData.data.imageUrl && formData.data.imageUrl.split(',').forEach(fileName => {
                this.data.photoFileList.push({
                    status: 'success',
                    url: this.data.$host + fileName,
                    fileName: fileName
                })
            });
            if (!formData.data.romanLetters) {
                var str = pinyinUtil.getPinyin(formData.data.standardName, '', true);
                formData.data.romanLetters = str;
            }

            this.setData({
                ...formData.data,
                photoFileList: this.data.photoFileList,
                locationStr: `${formData.data.longitude},${formData.data.latitude}`
            })
        }
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
            const result = await uploadFilePromise(lists[i].url);
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

    handleDeletePic(e) {
        this.data.photoFileList.splice(e.detail.index, 1)
        this.setData({
            photoFileList: this.data.photoFileList
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.initMatedata();
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