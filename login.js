
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'han113';

// const username = document.querySelector('#floatingInput').value;
// const password = document.querySelector('#floatingPassword').value;
// const signinBtn = document.querySelector('#signin');

const app = {
    data() {
        return {
            user: {
                username: '',
                password: '',
              },
        }
    },
    methods : {
        signin() {
            axios.post(`${url}admin/signin`, this.user).then((res) => {
                console.log(res.data.message)
                const {token,expired} = res.data;
                console.log(token,expired)
                // 寫入 cookie token expired
                document.cookie = `vue-Class = ${token}; expires = ${expired}`;
                axios.defaults.headers.common['Authorization'] = token;
                // 導入 products.html 頁面
                window.location = 'products.html';
            }).catch((err) => {
                console.log(err)
            })
        },
        checkStatus() {
            axios.post(`${url}api/user/check`).then((res) => {
                console.log(res)
                if(res.data.success) {
                    alert('登入成功 ~')
                }
            }).catch((err) => {
                console.log(err.response.data.message)
                alert('登入失敗，請確認您的使用者帳號跟密碼 ~')
            })
        },
        getData() {
            axios.get(`${url}api/${path}/products/all`).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
    }

}

createApp(app)
    .mount('#app')