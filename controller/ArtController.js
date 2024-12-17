const router = require('koa-router')()

const asyncHeadle = require("./baseController");
const Art = require("../service/Art");

router.get("/client/art", asyncHeadle(async (ctx, next) => {
    return await Art.getDataAll(ctx);
}))
router.get("/client/art/:id", asyncHeadle(async (ctx, next) => {
    return await Art.getDataById(ctx.params.id);
}))
router.post("/client/art", asyncHeadle(async (ctx, next) => {
    return await Art.addData(ctx.request.body);
}))
router.put("/client/art/:id", asyncHeadle(async (ctx, next) => {
    return await Art.updateData(ctx.params.id, ctx.request.body);
}))
router.delete("/client/art/:id", asyncHeadle(async (ctx, next) => {
    return await Art.deleteData(ctx.params.id);
}))

module.exports = router;