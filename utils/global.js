import {
    getVersion
} from './../utils/util'
(function () {
    var _Page = Page;
    Page = function (pageConfig) {
        mixinSync(pageConfig, "onLoad", onPageLoadExtra);

        // 默认分享全局配置
        var _onShareAppMessage = pageConfig.onShareAppMessage;
        _onShareAppMessage && (pageConfig.onShareAppMessage = function (options) {
            if (_onShareAppMessage) {
                var conf = _onShareAppMessage.call(this, options)
                return onShareAppMessageExtra(conf);
            }
        });
        _Page(pageConfig)
    }

})();



function checkToken() {
    // 暂时不检验是否过期
    const loginData = wx.getStorageSync('loginData') || {};
    return !!loginData.token;
}

// 自定义全局分享
function onShareAppMessageExtra(conf) {
    console.log('分享成功', conf);
    // 分享日志

    return conf;
}

// 拓展onLoad能力
async function onPageLoadExtra(conf, options, life) {

    // 处理【scene】参数
    handleScene.call(this, options);
    // 注入全局状态：挂接参数到AppData，提供wxml里使用
    // await 不能去掉
    return await initAppData.call(this, options);

}
/**
 * 将扫码传递的scene【约定格式：a:1,b:2 或 a=1,b=2】挂载到options
 * 分享自带当前页面的参数
 */
function handleScene(options) {
    if (options && options.scene) {
        const {
            scene
        } = options;
        delete options.scene;
        Object.assign(options, sceneToMap(scene));
        Object.assign(this.options, options);
    }
}


// 进入页面前-优先执行
// 路由守卫作用
async function initAppData(options) {
    const callback = async () => {
        let isLogin = checkToken();
        console.log('已登录');

        const data = {
            $options: {
                ...options,
            },
            $isLogin: isLogin,
            $route: this.route,
            $version: getVersion() || "",
            CustomBar: getApp().globalData.CustomBar
        };

        console.log('options: ', options)

        this.setData({
            ...data,
            ...this.data
        });
    }

    return new Promise(async (resolve) => {
        let isLogin = checkToken();
        if (!options.auth) {
            callback()
            resolve(true)
        } else if (options.auth && isLogin) {
            callback()
            resolve(true)
        } else {
            console.log('[路由守卫]未登录,即将前往登录');
            // 跳转登录
        }
    })
}

/**
 * 格式化扫码进入的参数，不支持参数里带有[:=]，否则解析会异常，参数不可以存在未编码的网址https://xx.com?a=1
 * @param {String} scene 
 * a:1,b:2
 * 推荐：a=1,b=2
 * 后端约定使用=
 */
function decodeURI(str) {
    if (str.indexOf('%') === -1) return str;
    return decodeURI(decodeURIComponent(str));
}

function sceneToMap(scene) {
    let decodeScene = decodeURI(scene)
    let scenes = decodeScene.split(',') || []
    let map = {
        scene
    };
    const handlerScene = (map, separator, scene) => {
        const [key, value] = scene.split(separator) || [];
        if (key)(map[key] = encodeURIComponent(value))
        return map
    }
    scenes.forEach(scene => {
        const separator = scene.indexOf('=') > -1 ? '=' : ':'
        handlerScene(map, separator, scene)
    })
    return map;
}

// 同步注入
function mixinSync(conf, life, fn) {
    const lifeHook = conf[life];
    if (lifeHook) {
        conf[life] = async function (options) {
            await fn.call(this, conf, options, life);
            console.log(life, ' 调用');
            lifeHook.call(this, options)
        }
    } else {
        conf[life] = async function (options) {
            await fn.call(this, conf, options)
        }
    }
}