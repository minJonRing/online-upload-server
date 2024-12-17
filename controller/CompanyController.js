const router = require('koa-router')()

const asyncHeadle = require("./baseController");
const Company = require("../service/Company");

router.get("/company", asyncHeadle(async (ctx, next) => {
    return await Company.getDataAll();
}))
router.get("/company/:id", asyncHeadle(async (ctx, next) => {
    return await Company.getDataById(ctx.params.id);
}))
router.post("/company", asyncHeadle(async (ctx, next) => {
    return await Company.addData(ctx.request.body);
}))
router.put("/company/:id", asyncHeadle(async (ctx, next) => {
    return await Company.updateData(ctx.params.id, ctx.request.body);
}))
router.delete("/company/:id", asyncHeadle(async (ctx, next) => {
    return await Company.deleteData(ctx.params.id);
}))

module.exports = router;