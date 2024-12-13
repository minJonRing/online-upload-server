/**
 * 通用分页查询函数
 * @param {Object} model - Mongoose 模型
 * @param {Object} query - 查询条件（可选）
 * @param {Number} page - 当前页数（从 1 开始）
 * @param {Number} pageSize - 每页条目数
 * @param {Object} options - 可选配置，如排序字段等
 * @returns {Object} - 分页结果，包含总数、页码信息和数据列表
 */
async function paginate(model, query = {}, page = 1, pageSize = 10, options = {}) {
    try {
        // 计算跳过的条目数
        const skip = (page - 1) * pageSize;

        // 排序字段，默认按创建时间降序
        const sort = options.sort || { createdAt: -1 };

        // 查询数据
        const data = await model
            .find(query)       // 应用查询条件
            .sort(sort)        // 排序
            .skip(skip)        // 跳过指定条数
            .limit(pageSize);  // 限制返回条数
        console.log(query)
        // 计算总数
        const total = await model.countDocuments(query);

        // 返回分页结果
        return {
            total,             // 总记录数
            pageNum: page,              // 当前页码
            pageSize,          // 每页条数
            // totalPages: Math.ceil(total / pageSize), // 总页数
            data               // 数据列表
        };
    } catch (error) {
        console.error('Error in paginate:', error.message);
        throw error;
    }
}

/**
 * 从数组字段中删除元素
 * @param {Object} model - Mongoose 模型
 * @param {Object} filter - 查询条件
 * @param {String} arrayField - 要操作的数组字段名
 * @param {Object} valueToRemove - 要删除的值或条件
 * @returns {Object} - 更新操作的结果
 */
async function removeFromArray(model, filter, arrayField, valueToRemove) {
    try {
        // 构造 $pull 更新对象
        const update = { $pull: { [arrayField]: valueToRemove } };
        console.log(update)
        // 执行更新操作
        const result = await model.updateOne(filter, update);

        return result; // 返回更新结果
    } catch (error) {
        console.error('Error in removeFromArray:', error.message);
        throw error;
    }
}

/**
 * 通用的数组字段查询工具
 * @param {String} model - Mongoose 模型
 * @param {String} field - 要查询的数组字段名
 * @param {String|Array} value - 要匹配的值或值列表
 * @param {Boolean} isMultiple - 是否匹配多个值
 * @returns {Promise<Array>} - 返回查询结果
 */
const queryArrayField = async (model, field, value, isMultiple = false) => {
    try {
        const condition = isMultiple
            ? { [field]: { $in: value } } // 多值查询
            : { [field]: value }; // 单值查询

        const results = await model.find(condition).populate({
            path: populateField, // 关联字段
        })
        return results;
    } catch (error) {
        console.error('Error querying array field:', error);
        throw error;
    }
};

module.exports = {
    paginate,
    removeFromArray,
    queryArrayField,
}
