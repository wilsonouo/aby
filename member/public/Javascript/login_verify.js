/*about login state and add the username into sidebar*/

    function login() {
        // 檢查 sessionStorage 中是否有 yourtoken
        const token = sessionStorage.getItem('yourtoken');

        if (token) {
            // 已登入狀態，執行登出動作

            // 清除 sessionStorage 中的 yourtoken
            sessionStorage.removeItem('yourtoken');

            // 將文字設置為 "登入"
            const accountIcon = document.querySelector('span.login_state');
            accountIcon.textContent = ' 登入 ';

            // 隱藏 .form
            const form = document.getElementsByClassName('form')[0];
            form.style.display = 'none';

            // 从 table 元素中删除所有子元素
            clear_sidebar_buttons();
        } else {
            // 未登入狀態，跳轉至 login.html
            window.location.href = 'login.html';
        }
    }

    // 把成功登陸的username加入sidebar
    function add_user_into_sidebar(username) {
        // 獲取sidebar中的table元素
        const sidebarTable = document.querySelector('.sidebar table');
        // 建立一個新的tr元素
        const newRow = document.createElement('tr');
        // 建立一個新的td元素
        const newTd = document.createElement('td');
        // 建立一個新的button元素
        const newButton = document.createElement('button');
        // 設定button的type屬性為button，避免提交表單
        newButton.setAttribute('type', 'button');
        // 設定button的樣式或class，你可以根據需要添加Tocas UI的class或自訂樣式
        newButton.classList.add('ts-button', 'is-primary');
        // 設定button的內容為使用者名稱
        newButton.textContent = username;

        // 添加点击事件处理程序
        newButton.addEventListener('click', function(event) {
            // 在按钮点击时显示加载视窗
            Swal.fire({
                title: 'Loading...',
                allowOutsideClick: true, 
                confirmButtonText: 'Cancel', // 更改按钮文本为 "Cancel"
                onBeforeOpen: () => {
                    Swal.showLoading();
                }
            });

            const token = sessionStorage.getItem('yourtoken');
            
            fetch('/match', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({ "MatchId": username}),
            })
            .then(response => {
                // 检查 HTTP 响应状态码
                if (response.ok) {
                // 使用 .json() 方法解析 JSON 数据
                return response.json();
                } else {
                // 处理错误情况
                throw new Error('Failed to fetch data');
                }
            })
            .then(data => {
                // 在这里可以访问后端返回的 JSON 数据
                //console.log('JSON data from server:', data);
                //console.log(data['result']);
                //console.log('hi');
                if(data['result'] == 1){
                    console.log("success");
                    // 配對成功时顯示提示
                    Swal.fire({
                        icon: 'success',
                        title: '配對成功',
                        text: '恭喜你，配對成功！'
                    });
                }
                    
                else{
                    console.log("you are failler");
                    // 配對失敗时顯示提示
                    Swal.fire({
                        icon: 'error',
                        title: '配對失敗',
                        text: data.message || '配對失敗，請重試。'
                    });
                }
            })
            .catch(error => {
                // 捕获并处理请求或解析 JSON 数据时的错误
                console.error('Error:', error);
            });
        });

        // 將新的button元素加入到新的td元素中
        newTd.appendChild(newButton);
        // 將新的td元素加入到新的tr元素中
        newRow.appendChild(newTd);
        // 將新的tr元素加入到sidebar的table元素中
        sidebarTable.appendChild(newRow);
    }

    