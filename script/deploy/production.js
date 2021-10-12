// const path = require('path')
// const { execSync } = require('child_process')
// const Client = require('ssh2-sftp-client')
// const resolve = dir => path.join(__dirname, dir)
// const sftp = new Client()

// const config = {
//   sftp: {
//     host: '192.168.0.208',
//     port: 22,
//     username: 'rsync',
//     password: '123456789',
//   },

//   remoteDir: '/sportsvideo/html',
// }

// async function main() {
//   const dist = path.join(__dirname, '../../', 'dist')
//   const tarName = `${Date.now()}.tar`
//   const tarPath = path.join(__dirname, '../../', tarName)

//   // 依赖系统 tar 命令
//   execSync(`tar -zcf ${tarPath} -C ${dist} .`)

//   try {
//     await sftp.connect(config.sftp)
//     await sftp.fastPut(tarPath, `${config.remoteDir}/${tarName}`)
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.error(`uploaded error: ${error}`)
//   } finally {
//     execSync(`rm ${tarPath}`)
//     sftp.end()
//   }
// }

// main()
