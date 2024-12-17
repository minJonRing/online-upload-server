const ResSuccess = (data, message = '请求成功!') => {
    return {
        code: 200,
        message,
        data
    }

}
const ResFail = (err, message = '请联系管理员!') => {
    return {
        code: 200,
        message: err.message || message
    }
}
module.exports = { ResSuccess, ResFail }

