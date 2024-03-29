import {
    deepTree,
    decimalToDMS,
    DMSToDecimal,
    uploadFileAll
} from './../../../utils/util'
import {pinyinUtil} from './../../../utils/pinyinutil'
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
        isSurveyor: false,

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
    async onGetLocationArea(e) {
        const {
            key
        } = e.currentTarget.dataset;
        const latitude = this.data[key + 'Latitude']
        const longitude = this.data[key + 'Longitude']
        const target = this.data.longitude && this.data.latitude ? {
            longitude,
            latitude,
        } : {};
        const res = await wx.chooseLocation(target);

        this.setData({
            [key + "Longitude"]: res.longitude,
            [key + "Latitude"]: res.latitude
        })
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
        this.setData({
            "useTime": e.detail,
        });
    },



    // 表单提交
    async handleFormSubmit() {
        const photoList = await uploadFileAll(this.data.photoFileList);
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
        const res = await wx.$api.editPlace({...data, status:2});
        console.log(res)
        if (res.code === 200) {
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
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
            if(!formData.data.romanLetters) {
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