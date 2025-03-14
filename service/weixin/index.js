const WeixinEquipTypeModel = require("../../models/weixin/WeixinEquipTypeModel");
const WeixinEquipModel = require("../../models/weixin/WeixinEquipModel");
const WeixinUserModel = require("../../models/weixin/WeixinUserModel");

const { generateSkinEquip, generateSkinEquipZD } = require('./generate')

let equipUpload = true;

let equipsType = []

let skins = {}

let equipImages = {}


const filterData = (data) => {
    data.map((el) => {
        const { key, label, child } = el
        equipsType.push({ key, label })
        equipImages[key] = []
        child.map(el => {
            const { key: ck, label, skins: s } = el;
            equipImages[key].push({ key: ck, label })
            skins[ck] = {}
            s.map(x => {
                const { key: k, link } = x;
                skins[ck][k] = link
            })
        })
    })
}

module.exports = {
    // 获取全部转隔壁
    getEquip: async (uuid) => {
        const result = await WeixinEquipModel.find({ uuid });
        return result;

    },
    // 装备抽取
    addEquip: async (uuid) => {
        try {
            if (equipUpload) {
                equipUpload = false;
                const data = await WeixinEquipTypeModel.find({})
                filterData(data)
            }
        } catch (error) {
            console.log(error)

        }
        const list = []
        for (let i = 0; i < 5; i++) {
            const equip = generateSkinEquip(equipsType, skins, equipImages)
            list.push({ uuid, ...equip })
        }
        const result = await WeixinEquipModel.insertMany(list, { ordered: false });
        return result;

    },
    // 装备合成
    synthesisEquip: async (uuid, equips) => {
        try {
            if (equipUpload) {
                equipUpload = false;
                const data = await WeixinEquipTypeModel.find({})
                filterData(data)
            }
            const { left, right, appoint } = equips;
            const { equipType } = left || right
            let equipInfo = null
            if (appoint) {
                equipInfo = appoint
            }

            const entryl = left.entry
            const entryr = right.entry
            const existEntry = []
            for (let i in entryl) {
                const l = entryl[i]
                for (let j in entryr) {
                    const r = entryr[j]
                    if (r == l) {
                        existEntry.push(l)
                    }
                }
            }
            // 获取可生成的词条比重
            let entryProbabilities = [];
            const count = entryl.length + entryr.length;
            switch (count) {
                case 2:
                    entryProbabilities = [
                        { count: 1, weight: 65 }, // 50% 的概率有 1 个词条
                        { count: 2, weight: 25 }, // 30% 的概率有 2 个词条
                        { count: 3, weight: 10 }, // 15% 的概率有 3 个词条
                    ]
                    break
                case 3:
                    entryProbabilities = [
                        { count: 1, weight: 25 }, // 50% 的概率有 1 个词条
                        { count: 2, weight: 60 }, // 30% 的概率有 2 个词条
                        { count: 3, weight: 15 }, // 15% 的概率有 3 个词条
                    ]
                    break
                case 4:
                    entryProbabilities = [
                        { count: 2, weight: 65 }, // 50% 的概率有 1 个词条
                        { count: 3, weight: 25 }, // 30% 的概率有 2 个词条
                        { count: 4, weight: 10 }, // 15% 的概率有 3 个词条
                    ]
                    break
                case 5:
                    entryProbabilities = [
                        { count: 2, weight: 20 }, // 50% 的概率有 1 个词条
                        { count: 3, weight: 40 }, // 30% 的概率有 2 个词条
                        { count: 4, weight: 40 }, // 15% 的概率有 3 个词条
                    ]
                    break
                case 6:
                    entryProbabilities = [
                        { count: 3, weight: 40 }, // 30% 的概率有 2 个词条
                        { count: 4, weight: 60 }, // 15% 的概率有 3 个词条
                    ]
                    break
                case 7:
                    entryProbabilities = [
                        { count: 3, weight: 25 }, // 30% 的概率有 2 个词条
                        { count: 4, weight: 75 }, // 15% 的概率有 3 个词条
                    ]
                    break
                case 8:
                    entryProbabilities = [
                        { count: 4, weight: 100 }, // 50% 的概率有 1 个词条
                    ]
                    break
                default:
                    break
            }
            // 获取可生成的皮肤比重
            const skinsData = [left.skinType, right.skinType]
            // option参数
            const option = {
                equipInfo,
                equipType,
                entryProbabilities,
                existEntry,
                skinsData: skinsData
            }
            const equip = generateSkinEquipZD(uuid, equipsType, skins, equipImages, option)
            // 删除数据+保存数据
            const ids = [left._id, right._id]
            await WeixinEquipModel.deleteMany({ _id: { $in: ids } });
            const data = WeixinEquipModel.create(equip)
            return data;
        } catch (error) {
            console.log(error)
        }

    },
    // 装备类型
    getEquipTypel: async () => {
        return await WeixinEquipTypeModel.find({})
    },
    addEquipTypel: async (data) => {
        equipUpload = true
        return await WeixinEquipTypeModel.create(data)
    },
    uploadEquipTypel: async (id, data) => {
        equipUpload = true
        return await WeixinEquipTypeModel.updateOne({ _id: id }, data)
    },
    deleteEquipTypel: async (id) => {
        return await WeixinEquipTypeModel.deleteOne({ _id: id })
    },
    // 获取全部用户
    getUserAll: async () => {
        return await WeixinUserModel.find({})
    },
    // 根据openId查询用户
    getUserByOpenId: async (openid) => {
        return await WeixinUserModel.findOne({ openid })
    },
    // 根据id查询
    getUserById: async (id) => {
        return await WeixinUserModel.findById(id)
    },
    addUser: async (user) => {
        return await WeixinUserModel.create(user)
    },
    updateUser: async (id, user) => {
        return await WeixinUserModel.updateOne({ _id: id }, user)
    }
};