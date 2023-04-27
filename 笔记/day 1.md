
node_modules文件夹：项目依赖文件夹

public文件夹:
一般放置一些静态资源（图片），放在这里面的静态资源，webpack进行打包的时候，会原封不动的打包到dist文件夹中

src文件夹（程序员源代码文件夹）:
    assets文件夹：一般也是放置静态资源（放置多个组件公用的资源），放置在assets文件夹的静态文件在打包时，webpack会把静态资源当作一个模块，打包到JS文件中

    component文件夹：放置的是非路由组件（常用的全局组件）

    App.vue:唯一的根组件
    main.js:程序入口文件，最先执行的文件

babel.config.js:配置文件（babel相关）

package.json文件：项目的身份证，记录项目中有什么依赖，怎么运行

package-lock.json文件:缓存性文件

1、有关路由
    1）view放路由组件
    2）compnent放非路由组件或者公用组件
    3）注册路由需要引入vue-router和vue，然后vue使用vuerouter，暴露一个路由实例，注意实例中的路由名为routes
    4）路由重定向用redirect，参数为路径
    5）路由需要在main.js中引入和使用
    6）需要在app.js中写路由出口标签
    7）可以在路由中使用meta来添加路由元信息，作为每一个路由的特定属性，比如show的值，可以用来表示是否显示
    8）路由传参（在push中写）
        a.param参数
        b.query参数
        c.有字符串形式、模板字符串形式和对象形式，最常用对象，但是对象中跳转路由需要写路由的name(搜索的gosearch方法)
