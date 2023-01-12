import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'han113';

// const username = document.querySelector('#floatingInput').value;
// const password = document.querySelector('#floatingPassword').value;
// const signinBtn = document.querySelector('#signin');

const app = {
    data() {
        return {
            products : [],
            tempProduct : {},
        }
    },
    methods : {
        checkStatus() {
            axios.post(`${url}api/user/check`).then((res) => {
                console.log(res);
                this.getProductList();
            }).catch((err) => {
                console.log(err)
                alert(err.response.data.message)
                // 導入 login.html 頁面
                window.location = 'login.html';
            })
        },
        getProductList() {
            axios.get(`${url}api/${path}/admin/products`).then((res) => {
                console.log(res.data)
                this.products = res.data.products;
            }).catch((err) => {
                console.log(err)
            })
        },
        openProduct(item) {
            this.tempProduct = item;
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)vue-Class\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
        this.checkStatus()
    }

}

createApp(app)
    .mount('#app')