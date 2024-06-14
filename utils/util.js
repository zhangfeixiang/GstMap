export let mock = 0;

export const getAppid = () => {
    return wx.getAccountInfoSync().miniProgram.appId;
}

export const getVersion = () => {
    return mock ? '1.0.1' : wx.getAccountInfoSync().miniProgram.version;
}
export const h5Host = 'https://beijing.tianditu.gov.cn'
// export const baseUrl = "http://www.gistoyou.com.cn:8443/applet"
// export const baseUrl = "http://39.98.214.43:8081/applet"
export const baseUrl = "https://beijing.tianditu.gov.cn/applet"

// // 示例用法
// var latitude = 40.7128; // 纬度
// var longitude = -74.0060; // 经度
// console.log("纬度: " + decimalToDMS(latitude));
// console.log("经度: " + decimalToDMS(longitude));
export function decimalToDMS(deg) {
    var d = Math.floor(deg);
    var minfloat = (deg - d) * 60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat - m) * 60;
    var s = Math.round(secfloat);
    if (s == 60) {
        m++;
        s = 0;
    }
    if (m == 60) {
        d++;
        m = 0;
    }
    return d + "° " + m + "' " + s + '"';
}


// "longitude": "116°5ˊ24.710″",
// "latitude": "39°56ˊ29.854″",
export function DMSToDecimal(dms) {
    if (!dms) return '';
    var parts = dms.split(/[^\d\w.]+/);
    var degrees = parseFloat(parts[0]);
    var minutes = parseFloat(parts[1]);
    var seconds = parseFloat(parts[2]);
    var direction = parts[3];

    var dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1; // 南纬或西经的情况，转换为负值
    }
    return dd;
}


export function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}


//递归数据改key
export function deepTree(objAry, val, key) {
    if (objAry != null) {
        objAry.forEach((item) => {
            Object.assign(item, {
                ['text']: item[val],
                ['id']: item[key]
            });
            delete item[val];
            delete item[key];
            deepTree(item.children, val, key);
        });
    }
}

export function uploadFilePromise(filePath, formData) {
    return new Promise((resolve, reject) => {
        let a = wx.uploadFile({
            url: 'https://www.gistoyou.com.cn:8443/applet/common/upload',
            filePath,
            name: 'file',
            formData,
            success: (res) => {
                const resData = JSON.parse(res.data)
                if (resData.code == 200) {
                    resolve(resData.data);
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
}

export async function uploadFileAll(arr) {
    const promises = arr.map(r => {
        if (r.status == 'uploading') {
            return new Promise(async (resolve) => {
                const data = await uploadFilePromise(r.url, {
                    name: r.name
                })
                resolve({
                    ...r,
                    status: "success",
                    url: data.url, //  完整路径
                    fileName: data.fileName, // 不包含域名前缀
                })
            });

        } else {
            return Promise.resolve(r)
        }
    });

    const resList = await Promise.all(promises);
    return resList;

}

export function parseUri(path, options = {}) {
    let url = '/' + path;
    if (Object.keys(options).length) {
        url += '?'
    }
    for (let key in options) {
        url += `${key}=${options[key]}&`
    }
    return url;
}