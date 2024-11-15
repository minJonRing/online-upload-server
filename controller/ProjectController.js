const router = require('koa-router')()

const asyncHeadle = require("./baseController");
const Project = require("../service/Project");

router.get("/project", asyncHeadle(async (ctx, next) => {
    return await Project.getDataAll();
}))
router.get("/project/:id", asyncHeadle(async (ctx, next) => {
    return await Project.getDataById(ctx.params.id);
}))
router.post("/project", asyncHeadle(async (ctx, next) => {
    return await Project.addData(ctx.request.body);
}))
router.put("/project/:id", asyncHeadle(async (ctx, next) => {
    return await Project.updateData(ctx.params.id, ctx.request.body);
}))
router.delete("/project/:id", asyncHeadle(async (ctx, next) => {
    return await Project.deleteData(ctx.params.id);
}))

module.exports = router;