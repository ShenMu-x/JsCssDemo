const install = new Vue({
    methods: {
        get(url) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.responseText);
                        else reject(xhr.responseText);
                    }
                }
            })
        },
        post(url,code,data){
            
        }
    }
})