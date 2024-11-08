const router = require('koa-router')()
const bcrypt = require('bcrypt');

const asyncHeadle = require("./baseController");
const Users = require("../service/Users");

const key = '$2b$10$r6RTrgR6nilvgJtIJwtIAu';

router.get("/user", asyncHeadle(async (ctx, next) => {
    return await Users.getUserAll();
}))
router.get("/user/:id", asyncHeadle(async (ctx, next) => {
    return await Users.getUserById(ctx.params.id);
}))
router.post("/user", asyncHeadle(async (ctx, next) => {
    const { password } = ctx.request.body
    const jm = bcrypt.hashSync(password, key);
    const data = {
        ...ctx.request.body,
        password: jm
    }
    return await Users.addUser(data);
}))
router.put("/user/:id", asyncHeadle(async (ctx, next) => {
    return await Users.updateUser(ctx.params.id, ctx.body);
}))
router.delete("/user/:id", asyncHeadle(async (ctx, next) => {
    return await Users.deleteUser(ctx.params.id);
}))

module.exports = router;