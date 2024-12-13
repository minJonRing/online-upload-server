const router = require('koa-router')()

const asyncHeadle = require("./baseController");
const Software = require("../service/Software");

router.get("/client/software", asyncHeadle(async (ctx, next) => {
    return await Software.getDataAll(ctx);
}))
router.get("/client/software/:id", asyncHeadle(async (ctx, next) => {
    return await Software.getDataById(ctx.params.id);
}))
router.post("/client/software", asyncHeadle(async (ctx, next) => {
    return await Software.addData(ctx.request.body);
}))
router.put("/client/software/:id", asyncHeadle(async (ctx, next) => {
    return await Software.updateData(ctx.params.id, ctx.request.body);
}))
router.delete("/client/software/:id", asyncHeadle(async (ctx, next) => {
    return await Software.deleteData(ctx.params.id);
}))

module.exports = router;