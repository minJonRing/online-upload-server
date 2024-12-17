const router = require('koa-router')()

const asyncHeadle = require("./baseController");
const Program = require("../service/Program");

router.get("/client/program", asyncHeadle(async (ctx, next) => {
    return await Program.getDataAll(ctx);
}))
router.get("/program/:id", asyncHeadle(async (ctx, next) => {
    return await Program.getDataById(ctx.params.id);
}))
router.post("/program", asyncHeadle(async (ctx, next) => {
    return await Program.addData(ctx.request.body);
}))
router.put("/program/:id", asyncHeadle(async (ctx, next) => {
    return await Program.updateData(ctx.params.id, ctx.request.body);
}))
router.delete("/program/:id", asyncHeadle(async (ctx, next) => {
    return await Program.deleteData(ctx.params.id);
}))

router.get("/client/programBySoftwareId", asyncHeadle(async (ctx, next) => {
    return await Program.getDataAllBySoftwareId(ctx);
}))

router.get("/client/program/:id", asyncHeadle(async (ctx, next) => {
    return await Program.getDataByClient(ctx.params.id);
}))


module.exports = router;