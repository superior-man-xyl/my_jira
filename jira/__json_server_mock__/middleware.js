// 通过这个中间件来实现我们自定义的接口
// 在package.json下写入--middlewares __json_server_mock__/middleware.js，就能使用该中间件了,成功注入到json-server
module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        if (req.body.username === 'goodxyl' && req.body.password === '123456') {
            return res.status(200).json({
                user: {
                    token: '123456', //使用JWT来验证
                }
            })
        } else {
            return res.status(400).json({
                message: '用户名或密码错误',
            })
        }
    }
    next();
}