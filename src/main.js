import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
router.afterEach((to, from, next) => {
    document.querySelector("body").setAttribute("style", "overflow: auto !important;")
});

const app = createApp(App)
app.use(store);
app.use(router);
app.use(ElementPlus,{locale});
app.use(ElementPlus, { size: 'small', zIndex: 3000 });
app.mount('#app');

