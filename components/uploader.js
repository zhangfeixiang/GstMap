// components/uploader.js

function formatImage(res) {
    return res.tempFiles.map(function (item) {
        return ({
            type: 'image',
            url: item.tempFilePath || item.path,
            thumb: item.tempFilePath || item.path
        });
    });
}

function formatVideo(res) {
    return [{
        type: 'video',
        url: res.tempFilePath,
        thumb: res.thumbTempFilePath
    }, ];
}
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        prefix: {
            type: String,
            value: ""
        },
        accept: {
            type: String,
            value: "image"
        },
        fileList: {
            type: Array,
            observer: "formatFileList"
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        lists: [],
        currentName: "",
        currentIndex: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        formatFileList() {
            const lists = this.data.fileList.map(it => {
                if (it.name) {
                    return it;
                }
                const filename = it.url.split('/').slice(-1)[0]
                const name = filename.split('.')[0]
                const ext = filename.split('.')[1]
                return {
                    ...it,
                    name,
                    ext: ext ? '.' + ext : ''
                }
            })
            this.setData({
                lists
            })
        },
        async chooseImages() {
            let res = {};
            switch (this.properties.accept) {
                case "image":
                    res = await wx.chooseImage();
                    res = formatImage(res);
                    break;
                case "video":
                    res = await wx.chooseVideo();
                    res = formatVideo(res)
                    break;
                default:
                    res = await wx.chooseMessageFile({
                        count: 9,
                    });
            }

            let _addlists = [].concat(res);
            const lists = this.data.lists;
            _addlists.map((item) => {
                let url = item.url;
                let ext = '.' + url.split('.')[1];
                const lastItem = lists[lists.length - 1];
                const lastNum = lastItem ? (lastItem.name.match(/\d+/g) || [0])[0] : 0;
                lists.push({
                    ...item,
                    url: item.url,
                    status: "uploading",
                    name: this.properties.prefix + (Number(lastNum) + 1 + "").padStart(2, "0"),
                    ext,
                });
            });

            this.setData({
                lists
            })
            this.triggerEvent('change', this.data.lists)
            wx.hideLoading()
        },

        handleDeletePic(e) {
            this.data.lists.splice(e.currentTarget.dataset.index, 1)
            this.setData({
                lists: this.data.lists
            })
            this.triggerEvent('change', this.data.lists)
        },
        preview(e) {
            const {
                index
            } = e.currentTarget.dataset;
            const urls = this.data.lists.map(it => {
                return {
                    url: it.url,
                    type: "image"
                }
            });
            wx.previewMedia({
                sources: urls,
                current: index
            })
        },
        previewVideo(e) {
            const {
                index
            } = e.currentTarget.dataset;
            const urls = this.data.lists.map(it => {
                return {
                    url: it.url,
                    type: "video"
                }
            });
            wx.previewMedia({
                sources: urls,
                current: index
            })
        },
        onEdit(e) {
            const {
                index
            } = e.currentTarget.dataset;
            this.setData({
                showEditName: true,
                currentIndex: index,
                currentName: this.data.lists[index].name
            })
        },
        handleClose() {
            this.setData({
                showEditName: false,
                currentIndex: 0,
                currentName: ""
            })
        },
        handleConfirm(e) {
            const {
                value
            } = e.currentTarget.dataset;
            this.data.lists[this.data.currentIndex].name = value
            this.setData({
                showEditName: false,
                currentIndex: 0,
                currentName: "",
                lists: this.data.lists
            });
            this.triggerEvent('change', this.data.lists)
        },
    }
})