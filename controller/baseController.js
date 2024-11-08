const { ResSuccess } = require("../base/ResApi");

module.exports = (headle) => {
    return async (ctx, next) => {
        try {
            const result = await headle(ctx, next);
            ctx.body = ResSuccess(result)
        } catch (e) {
            next(e);
        }
    }
}