module.exports = {
    apps: [
        {
            name: 'app',
            script: './app.js',
            watch: true,
            ignore_watch: ['node_modules', 'logs'],
            watch_options: {
                followSymlinks: false, // 防止符号链接引起循环监听
                usePolling: true // 提高兼容性，特别是网络文件系统
            }
        }
    ]
};
