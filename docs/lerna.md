使用lerna管理多包
使用yarn作为包管理工具，yarn的workspaces功能可以管理多个包

步骤1:
在项目根目录下执行
yarn global add lerna
备注：
    我这边因为默认采用的是npm，所以如果使用上面命令的话，会报错
    使用npm的安装命令是：
    npm install -g lerna
    所以我全局默认使用npm安装

查看自己的安装包：
   npm的全局工作目录： npm list -g --depth=0
   yarn的全局工作目录： yarn global list

步骤2:
初始化
lerna init
    如果报错：
    Cannot initialize lerna because your package manager has not been configured to use `workspaces`
    则需要修改package.json文件，添加workspaces属性
    "workspaces": [
        "packages/*"
    ]
    然后再执行lerna init
    执行成功后，会在根目录下生成lerna.json文件
    该文件是lerna的配置文件，用于管理多个包

步骤3:
创建包（这个不好用， 后面自己写脚本）
lerna create <package-name>
    例如：
    lerna create utils
    lerna create components
