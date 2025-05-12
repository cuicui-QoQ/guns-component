给工作区根目录安装开发依赖
yarn add <package> -D -W
比如：yarn add jest -D -W

给指定工作区安装依赖
yarn workspace <workspace-name> add <package>
比如：yarn workspace lg-button add lodash@4

给所有工作区安装依赖
yarn install

运行某个项目则直接在packages 目录下去 yarn dev 即可


- 你在 yarn 工作区（workspace）环境下运行了 yarn add 命令。
- yarn 检测到你没有使用 -W 或 --ignore-workspace-root-check 参数，因此提示你可能不希望将依赖安装到工作区根目录。
-yarn add commander
-error Running this command will add the dependency to the workspace root rather than the workspace itself, which might not be what you want - if you really meant it, make it explicit by running this command again with the -W flag (or --ignore-workspace-root-check).

比如提示没有下面的库：eslint-plugin-react
检查这个库是开发依赖，然后按照下面的代码安装
yarn add eslint-plugin-react -D -W
