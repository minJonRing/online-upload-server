const weightSkin = [
    { label: '卓越', key: 'sk1', weight: 60 }, // 50% 的概率有 1 个词条
    { label: '黑鹰', key: 'sk2', weight: 20 }, // 30% 的概率有 2 个词条
    { label: '铁爪', key: 'sk3', weight: 15 }, // 15% 的概率有 3 个词条
    { label: '轩辕', key: 'sk4', weight: 5 },   // 5% 的概率有 4 个词条
]
const weightProbabilities = [
    { count: 1, weight: 60 }, // 50% 的概率有 1 个词条
    { count: 2, weight: 20 }, // 30% 的概率有 2 个词条
    { count: 3, weight: 15 }, // 15% 的概率有 3 个词条
    { count: 4, weight: 5 },   // 5% 的概率有 4 个词条
]


const entrys = {
    qiangxie: [
        "精致单头",
        "穿甲单头",
        "空心单头",
        "液氮单头",
        "快把枪套",
        "智能瞄具",
        "轻质弹夹",
        "轻质材料",
        "枪机调试",
        "护甲破坏",
        "斩首利器",
        "冷血杀手",
        "暗影猎杀",
    ],
    jia: [
        "耐火材料",
        "耐磨材料",
        "抗毒材料",
        "肢体护具",
        "信号增强",
        "重型材料",
        "防爆材料",
        "加厚材料",
        "晶体材料",
        "战时修复",
    ],
    bao: [
        "加密隔层",
        "高级加密隔层",
        "弹性隔层",
        "高级弹性隔层",
        "便捷医疗",
        "回收期",
        "战时激素",
        "战地医疗",
    ],
    tou: [
        "夜视目镜",
        "战术目镜",
        "复合纤维",
        "加厚材料",
        "反侦察雷达",
        "耐磨材料",
        "战术声呐",
    ]
}


// 获取权重
function getTotalWeight(affixes) {
    return affixes.reduce((sum, affix) => sum + affix.weight, 0);
}


// 生成皮肤类型/词条数量
const getRandomCount = (data) => {
    const totalWeight = getTotalWeight(data);
    let random = Math.random() * totalWeight;
    for (const p of data) {
        if (random < p.weight) return p;
        random -= p.weight;
    }
    return data[0];
}

//  生成词条
const generateEquipment = (probability, entrys = []) => {
    const { count: attributeCount } = getRandomCount(probability);
    const chosenAttributes = [];
    const usedIndices = new Set();

    const possibleAttributes = entrys;

    while (chosenAttributes.length < attributeCount) {
        const randomIndex = Math.floor(Math.random() * possibleAttributes.length);
        if (!usedIndices.has(randomIndex)) {
            chosenAttributes.push(possibleAttributes[randomIndex]);
            usedIndices.add(randomIndex);
        }
    }

    return chosenAttributes;
}

// 生成皮肤
const generateSkin = () => {
    const item = getRandomCount(weightSkin);
    return item;
}

// 随机生成
const generateSkinEquip = (equipsType, skins, equipImages) => {
    // 获取装备类型 (头/甲/包/武器)
    const v = Math.floor(Math.random() * 4)
    const { key: equipType } = equipsType[v];
    // 获取皮肤类型 (普通、黑鹰、铁爪、轩辕)
    const { key: skinType, label: skinLabel } = generateSkin();
    // 生成词条 - 几率  词条集合
    const entry = generateEquipment(weightProbabilities, entrys[equipType])
    // 获取装备图片
    const equipList = equipImages[equipType]; // 装备列表 ['aug','gz'],
    const equip = equipList[Math.floor(Math.random() * equipList.length)]  // 获取指定装备 tou jia bao aug gz
    const { key: equipKey, label: equipLabel } = equip;
    const skin = skins[equipKey][skinType]; // 获取皮肤

    const equipment = {
        label: `${equipLabel}(${skinLabel})`,
        skin,
        entry,
        skinType, // 'sk1
        equipType // jia/qiangxie
    }
    return equipment
}

// 指定生成  装备类型 合成几率 指定的装备 已存在的词条 皮肤几率 皮肤类型
const generateSkinEquipZD = (uuid, equipsType, skins, equipImages, { equipInfo, equipType, entryProbabilities, existEntry, skinsData }) => {
    try {
        let euqip = {}
        if (equipInfo) {
            euqip = {
                uuid,
                label: equipInfo.label,
                skin: equipInfo.skin,
                entry: [],
                skinType: equipInfo.skinType,
                equipType: equipInfo.equipType,
            }
        } else {
            // 随机
            let skinInfo = {};
            if (equipType == 'qiangxie') {
                // 获取皮肤类型 (普通、黑鹰、铁爪、轩辕)
                skinInfo = generateSkin();
            } else {
                const weight = []
                for (let i in weightSkin) {
                    const el = weightSkin[i]
                    const { key } = el;
                    if (skinsData.includes(key)) {
                        weight.push(el)
                    }
                }
                skinInfo = getRandomCount(weight);
            }
            const { key: skinType, label: skinLabel } = skinInfo;
            // 获取装备图片
            const equipList = equipImages[equipType]; // 装备列表 ['aug','gz'],
            const equip = equipList[Math.floor(Math.random() * equipList.length)]  // 获取指定装备 tou jia bao aug gz
            const { key: equipKey, label: equipLabel } = equip;
            const skin = skins[equipKey][skinType]; // 获取皮肤
            // // 获取装备图片
            euqip = {
                uuid,
                label: `${equipLabel}(${skinLabel})`,
                skin,
                entry: [],
                skinType,
                equipType
            }

        }

        // 生成词条 - 几率/词条
        const existEntryLen = existEntry.length;
        const entry = generateEquipment(entryProbabilities, entrys[equipType].filter(i => !existEntry.includes(i)))
        if (existEntryLen) {
            // [0,1,2,3] [1,2,3]
            const entryLen = entry.length;
            entry.splice(entryLen - existEntryLen, entryLen)
        }

        const equipment = {
            ...euqip,
            entry: [...existEntry, ...entry]
        }
        return equipment
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    generateSkinEquip,
    generateSkinEquipZD
}

