全局安装
    npm i lerna -g

初始化
    lerna init

发布
    lerna publish

    这个命令会发布所有的包

发布前需要保证先切换到npm的源
使用 npm login 命令登陆
再发布

目前暂时没有发包成功
    已解决上面问题，这是因为脚手架 默认设置的时候，是私有的，不公开

更新版本号
npx lerna version --scope=cui-react-timer

发布子包
npx lerna publish from-package --scope=cui-react-timer
