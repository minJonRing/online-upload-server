const axios = require('axios');
const router = require('koa-router')()

const asyncHeadle = require("./baseController");
const Weixin = require("../service/weixin/index");

// 获取用户openId


// 替换为你的小程序的 AppID 和 AppSecret
const appId = 'wxdc4e20f545ca96df';
const appSecret = '2b76e0a108eb92d8d4ff2acbd29c5d82';

router.get("/client/weixin/authorize", asyncHeadle(async (ctx, next) => {
    const { code } = ctx.request.query;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
    try {
        const response = await axios.get(url);
        const { openid } = response.data;
        const result = await Weixin.getUserByOpenId(openid)
        let uuid = null;
        if (!result) {
            const { _id: id } = await Weixin.addUser({
                openid,
                username: '未填写',
                avatarUrl: ""
            })
            uuid = id
        } else {
            const { _id: id } = await Weixin.getUserByOpenId(openid)
            uuid = id
        }
        return { ...response.data, uuid }; // 返回 openid 和 session_key
    } catch (error) {
        console.error('Error getting openid:', error);
        throw error;
    }
}))
// 装备类型
router.get("/client/weixin/getEquipType", asyncHeadle(async (ctx, next) => {
    return await Weixin.getEquipTypel();
}))
router.post("/client/weixin/getEquipType", asyncHeadle(async (ctx, next) => {
    return await Weixin.addEquipTypel(ctx.request.body);
}))
router.put("/client/weixin/getEquipType/:id", asyncHeadle(async (ctx, next) => {
    return await Weixin.uploadEquipTypel(ctx.params.id, ctx.request.body);
}))
router.delete("/client/weixin/getEquipType/:id", asyncHeadle(async (ctx, next) => {
    return await Weixin.deleteEquipTypel(ctx.params.id);
}))

// 
router.get("/client/weixin/getEquip/:uuid", asyncHeadle(async (ctx, next) => {
    return await Weixin.getEquip(ctx.params.uuid);
}))

router.post("/client/weixin/getEquip/:uuid", asyncHeadle(async (ctx, next) => {
    return await Weixin.addEquip(ctx.params.uuid);
}))

router.post("/client/weixin/synthesis/:uuid", asyncHeadle(async (ctx, next) => {
    return await Weixin.synthesisEquip(ctx.params.uuid, ctx.request.body);
}))



router.get("/client/weixin/user/:id", asyncHeadle(async (ctx, next) => {
    return await Weixin.getUserById(ctx.params.id);
}))

router.get("/client/weixin/user/openid/:openid", asyncHeadle(async (ctx, next) => {
    return await Weixin.getUserByOpenId(ctx.params.openid);
}))

router.post("/client/weixin/user", asyncHeadle(async (ctx, next) => {
    return await Weixin.addUser(ctx.request.body);
}))

router.put("/client/weixin/user/:id", asyncHeadle(async (ctx, next) => {
    return await Weixin.updateUser(ctx.params.id, ctx.request.body);
}))


module.exports = router;