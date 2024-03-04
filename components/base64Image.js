// components/base64Image.js
import {
    decode
} from 'base64-arraybuffer';
Component({

    /**
     * 组件的属性列表
     */
    properties: {
        src: {
            type: String,
            value: "",
            observer: 'initBase64',
        },

        height: {
            type: Number,
            value: 50
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        filePath: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        initBase64() {
            const base64Part = this.properties.src;
            const arrayBuffer = decode(base64Part);
            const fs = wx.getFileSystemManager();
            const filePath = wx.env.USER_DATA_PATH + '/cache-image.png';
            // 保存为文件
            fs.writeFile({
                filePath: filePath,
                data: arrayBuffer,
                encoding: 'binary',
                success: () => {
                    console.log('文件保存成功:', filePath);
                    this.setData({
                        filePath: filePath + "?t=" + Date.now()
                    })
                },
                fail: function (err) {
                    console.error('文件保存失败:', err);
                },
            });
        }
    }
})