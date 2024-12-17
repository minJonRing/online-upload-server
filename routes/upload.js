const formidable = require('formidable')
const path = require("path")
const fs = require('fs');
const fsPromises = fs.promises;

// oss
const { put } = require("../utils/oss")


const mv = async (sourcePath, destPath) => {
    return fsPromises.rename(sourcePath, destPath);
};

const getType = (str) => {
    return str.replace(/.+(?=\.)/g, '')
}

function upload(url = "image") {
    return async function (ctx, next) {
        await next()
        const form = new formidable.IncomingForm({
            encoding: 'utf-8',
            uploadDir: path.join(__dirname + "/../public/upload/" + url), // 设置文件保存目录
            maxFieldsSize: 10 * 1024 * 1024 * 1024,//上传文件的最大大小
            maxFileSize: 10 * 1024 * 1024 * 1024, // 设置单个文件的最大大小为 10GB
            maxTotalFileSize: 10 * 1024 * 1024 * 1024, // 设置总文件大小限制为 10GB
            multiples: true, // 允许多个文件上传
            keepExtensions: true, // 保留扩展名
        });
        // 存储文件
        const files = await new Promise((resolve, reject) => {
            try {
                form.parse(ctx.req, async (err, fields, { file }) => {
                    try {
                        if (err) { resolve([]); return; }
                        if (Array.isArray(file)) {
                            const list = file.map(el => {
                                const { newFilename, originalFilename } = el;
                                return {
                                    fileName: originalFilename.replace(/(?=\.).+/g, ''),
                                    filePath: `/upload/${url}/${newFilename}`,
                                    ossName: originalFilename
                                }
                            })
                            resolve(list)
                        } else {
                            const { newFilename, originalFilename } = file;
                            resolve([{ fileName: originalFilename.replace(/(?=\.).+/g, ''), filePath: `/upload/${url}/${newFilename}`, ossName: originalFilename }])
                        }
                    } catch (err) {
                        console.log(err.message)
                        resolve([])
                    }
                })

            } catch (err) {
                console.log(err.message)
                resolve([])
            }
        })
        const bool = !!files.length;
        let oss = {}
        if (bool) {
            const { ossName, filePath } = files[0]
            oss = await put(ossName, path.join(__dirname + '/../public' + filePath))
        }
        ctx.body = {
            code: 200,
            message: bool ? '上传成功' : '上传失败,请联系管理员',
            data: bool ? [{ fileName: oss.name, filePath: oss.url }] : []
        }
    }
}

function uploadWangeditor(url = "image") {
    return async function (ctx, next) {
        await next()
        const form = new formidable.IncomingForm({
            encoding: 'utf-8',
            uploadDir: path.join(__dirname + "/../public/upload/" + url), // 设置文件保存目录
            maxFieldsSize: 10 * 1024 * 1024 * 1024,//上传文件的最大大小
            maxFileSize: 10 * 1024 * 1024 * 1024, // 设置单个文件的最大大小为 10GB
            maxTotalFileSize: 10 * 1024 * 1024 * 1024, // 设置总文件大小限制为 10GB
            multiples: true, // 允许多个文件上传
            keepExtensions: true, // 保留扩展名
        });
        // 存储文件
        const files = await new Promise((resolve, reject) => {
            try {
                form.parse(ctx.req, async (err, fields, data) => {
                    const file = data['wangeditor-uploaded-image'];
                    try {
                        if (err) { resolve([]); return; }
                        if (Array.isArray(file)) {
                            const list = file.map(el => {
                                const { newFilename, originalFilename } = el;
                                return {
                                    fileName: originalFilename.replace(/(?=\.).+/g, ''),
                                    filePath: `/upload/${url}/${newFilename}`,
                                    ossName: originalFilename
                                }
                            })
                            resolve(list)
                        } else {
                            const { newFilename, originalFilename } = file;
                            resolve([{ fileName: originalFilename.replace(/(?=\.).+/g, ''), filePath: `/upload/${url}/${newFilename}`, ossName: originalFilename }])
                        }
                    } catch (err) {
                        console.log(err.message)
                        resolve([])
                    }
                })
            } catch (err) {
                console.log(err.message)
                resolve([])
            }
        })
        const bool = !!files.length;
        let oss = {}
        if (bool) {
            const { ossName, filePath } = files[0]
            oss = await put(ossName, path.join(__dirname + '/../public' + filePath))
        }

        ctx.body = {
            code: 200,
            errno: bool ? 0 : 1,
            message: bool ? '上传成功' : '上传失败,请联系管理员',
            data: {
                url: bool ? oss.url : '', // 图片 src ，必须
            }
        }
    }
}

module.exports = { upload, uploadWangeditor };