1、运行环境：node
请先安装nodejs环境，详情访问：https://nodejs.org/

2、安装好node之后，进入跟目录下执行：
npm install

3、安装全局依赖库：执行：
npm install -g grunt-cli bower yo

4、安装项目依赖js\css库，在/angular 目录下执行：
window: bower install
mac:sudo bower install --allow-root

5、运行项目，在/angular 目录下执行：
grunt serve

（注：以上所有指令，如果是window则直接执行，如果是mac，则在指令前面加上sudo。例如：sudo npm install）


目录结构说明：

client:存放H5前端所有文件，主要前端逻辑开发，就在这里
dist:在打包生产的时候回生成该文件夹，用于部署服务器
e2e:这个不用理会-。-
node_modules:npm install完成后会出现该文件夹，项目的依赖包
server:本地node服务器