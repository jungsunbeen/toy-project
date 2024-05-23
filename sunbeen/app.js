const baseUrl = "https://lionguest.p-e.kr/guestbook/";
const listContainer = document.getElementById('list');
const writeBtn = document.getElementById('write-btn');

const getData = async () => {
    try {
        const fetchData = await fetch(baseUrl);
        const toJson = await fetchData.json();
        //console.log(toJson);
        listContainer.innerHTML = ''; //없으면 중복됨
        toJson.forEach(entry => displayData(entry));
    } catch (error) {
        console.error(error);
    }
};

const displayData = (data) => {
    const entry = document.createElement("div");
    entry.id = 'entry';
    entry.classList.add("entry");
    entry.innerHTML = `
        <p id="titleinentry">${data.title}</p>
        <p id="contentinentry">${data.content}</p>
        <p id="infoinentry">${data.writer} <br> ${new Date(data.created_at).toLocaleString()}</p>
        <div style="text-align: center;">
            <input type="password" placeholder="비밀번호">
            <button class="delete-btn">삭제</button>
        </div>
    `;
        
    // 삭제 버튼 이벤트 리스너 추가
    const deleteBtn = entry.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function() {
        const passwordField = entry.querySelector("input[type='password']");
        const inputPassword = passwordField.value;
        if (inputPassword === data.password) {
            console.log('Entry deleted:', entryData);
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    });

    //방명록에 추가 (역순으로)
    listContainer.insertBefore(entry, listContainer.firstChildElementChild);
};

//document.addEventListener('DOMContentLoaded', getData);

writeBtn.addEventListener('click', function() {
    const authorInput = document.querySelector("#user-container input[type='text'][placeholder='작성자']");
    const passwordInput = document.querySelector("#user-container input[type='password'][placeholder='비밀번호']");
    const titleInput = document.querySelector("#write-container input[type='text'][placeholder='제목']");
    const contentInput = document.querySelector("#write-container input[type='text'][placeholder='내용을 입력하세요']");

    const author = authorInput.value;
    const password = passwordInput.value;
    const title = titleInput.value;
    const content = contentInput.value;

    //새로운 방명록
    const newEntry = {
        writer: author,
        title: title,
        content: content,
        password: password,
        created_at: new Date().toISOString()
    };
    postData(newEntry);
});

const postData = async (entry) => {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });
        /*
        const result = await response.json();
        getData();
        index.js에서 추가하기 때문에 불러올 필요 없음
        */
    } catch (error) {
        console.error(error);
    }
};

// load 될 때 불러옴
window.onload = getData;