document.write('<script src="Javascript/shareoutDate.js"></script>');

const inputTranslationMap = {
    male: '男性',
    female: '女性',
    other: '其他',
  };

const interestTranslationMap = {
    darts: '射飛鏢',
    boardgames: '桌上遊戲',
    cooking: '烹飪',
    chess: '西洋棋',

    basketball: '籃球',
    baseball: '棒球',
    boxing: '拳擊',
    billiards: '撞球',
    climbing: '攀岩',

    drawing: '繪畫',
    calligraphy: '書法',
    writing: '閱讀/寫作',
    dancing: '舞蹈',
    crafts: '手工藝',
    drama: '戲劇欣賞',

    aquarium: '水族館',
    museum: '博物館',
    camping: '露營',
    beach: '沙灘',
    zoo: '動物園',

    driving: '兜風',
    debate: '辯論',
    cosplay: 'cosplay',
    bridge: '橋牌',
    birdwatching: '賞鳥',
  };

//跳出成功儲存小視窗
function saveData(event) {
    const interests = [];
    const server = [];
    const client = [];
    event.preventDefault()
    const gender = document.getElementById('gender').value
    const checkboxElements = Array.from(document.querySelectorAll('.ts-checkbox input[type="checkbox"]'));
    //將所有已勾選的.ts-checkbox元素加入陣列
    checkboxElements.forEach(checkbox => {
        if (checkbox.checked) {
            // 如果 checkbox 是被選中的，將其 value 加入到興趣選項數組中

            const interest_server = checkbox.value + '_server';
            const interest_client = checkbox.value + '_client';
            server.push(interest_server);
            client.push(interest_client);
            interests.push(checkbox.checked);
        }
    });

    // 使用映射將英文性別和興趣值轉換為中文
    const translatedInterests = interests.map(interest => interestTranslationMap[interest]);
    const translatedGender = inputTranslationMap[gender];

    //data in json body
    const server_to_vector = server.map(interest => sever_client[interest]);
    const client_to_vector = client.map(interest => sever_client[interest]);

    //確認視窗
    Swal.fire({
        title: '確認資料',
        html: `您選擇的性別：${translatedGender}<br>您選擇的興趣/喜好的旅遊地點：<br>${translatedInterests.join(', ')}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '修改',
    }).then((result) => {
        if (result.isConfirmed) {
            formData = ({ gender, server_to_vector,  client_to_vector})
            const token = sessionStorage.getItem('yourtoken');
            
            fetch('/interest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(formData),
            })

            //成功提交的提示視窗
            Swal.fire({
                icon: 'success',
                title: '已儲存'
            })
            //重置 checkbox 狀態
            resetCheckboxStatus();
            //隱藏表單
            let formContainer = document.getElementsByClassName('form-container')[0]
            formContainer.style.display = 'none'
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
    });
}

//跳出取消儲存小視窗
function cancelForm(event) {
    event.preventDefault()

    //確認視窗
    Swal.fire({
        title: '確認離開嗎',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '離開',
        cancelButtonText: '取消',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'warning',
                title: '變更未儲存'
            })
            //重置 checkbox 狀態
            resetCheckboxStatus();
            //隱藏表單
            let formContainer = document.getElementsByClassName('form-container')[0];
            formContainer.style.display = 'none';
        } else if (result.dismiss === Swal.DismissReason.cancel) {

        }
    });
}

//重置 checkbox 狀態
function resetCheckboxStatus() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

// 隱藏表單容器
function hide_subForm() {
    //const _subForm = document.querySelector('._subForm');
    //_subForm.style.display = 'none';
    entertainmentForm.style.display = 'none';
    sportsForm.style.display = 'none';
    artForm.style.display = 'none';
    placeForm.style.display = 'none';
    otherForm.style.display = 'none';
    document.body.removeEventListener('click', bodyClickHandler);
}

// 顯示表單容器
function showFormContainer() {
    //getElementsByClassName回傳匹配class的節點集合
    const formContainer = document.getElementsByClassName('form-container')[0]
    formContainer.style.display = 'block'
    const body = document.querySelector('body');
    formContainer.classList.add('show'); //Add the 'show' class to the form container
    body.classList.add('form-open'); //Add the 'form-open' class to the body for background change
    document.body.addEventListener('click', bodyClickHandler);
}

//點擊興趣按鈕
function toggleInterest(event) {
    const button = event.target
    button.classList.toggle('active')
}
//點擊室內娛樂按鈕
function click_entertainment(event){
    // 取得娛樂表單元素
    const entertainmentForm = document.getElementById('entertainmentForm');
    entertainmentForm.style.display = 'block';
    event.stopPropagation();
    document.body.addEventListener('click', bodyClickHandler);
}
//點擊戶外運動按鈕
function click_sports(event){
    // 取得運動表單元素
    const sportsForm = document.getElementById('sportsForm');
    //顯示運動小表單
    sportsForm.style.display = 'block';
    event.stopPropagation();
    document.body.addEventListener('click', bodyClickHandler);
}
//點擊藝術按鈕
function click_art(event){
    // 取得藝術表單元素
    const artForm = document.getElementById('artForm');
    //顯示藝術小表單
    artForm.style.display = 'block';
    event.stopPropagation();
    document.body.addEventListener('click', bodyClickHandler);
}
//點擊地點按鈕
function click_place(event){
    // 取得地點表單元素
    const placeForm = document.getElementById('placeForm');
    //顯示地點小表單
    placeForm.style.display = 'block';
    event.stopPropagation();
    document.body.addEventListener('click', bodyClickHandler);
}
//點擊其他按鈕
function click_other(event){
    // 取得其他表單元素
    const otherForm = document.getElementById('otherForm');
    //顯示其他小表單
    otherForm.style.display = 'block';
    event.stopPropagation();
    document.body.addEventListener('click', bodyClickHandler);
}
