const baseUrl = "https://lionguest.p-e.kr/guestbook/";
const listContainer = document.getElementById('list');
const writeBtn = document.getElementById('write-btn');

const getData = async () => {
    const fetchData = await fetch(baseUrl);
    console.log(fetchData);
    const toJson = await fetchData.json();
    console.log(toJson);
    const datas = await toJson.response.body.items.item;
    console.log(datas);
    displayData(datas);
};

const displayData = (data) => {
    listContainer.innerHTML = '';
    data.forEach(entryData => {
        const entry = document.createElement("div");
        entry.classList.add("entry");
        entry.innerHTML = `
            <p id="titleinentry">${entryData.title}</p>
            <p id="contentinentry">${entryData.content}</p>
            <p id="infoinentry">${entryData.writer} <br> ${entryData.created_at}</p>
            <div style="text-align: center;">
                <input type="password" placeholder="비밀번호를 입력하세요">
                <button class="delete-btn">삭제</button>
            </div>
        `;
        
        // 삭제 버튼 이벤트 리스너 추가
        const deleteBtn = entry.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function() {
            const passwordField = entry.querySelector("input[type='password']");
            const inputPassword = passwordField.value;
            // 여기서 비밀번호 확인 로직을 구현하고, 맞다면 entry를 삭제합니다.
            if (inputPassword === entryData.password) {
            } else {
                alert("비밀번호가 일치하지 않습니다.");
            }
        });

        // 방명록에 추가
        listContainer.prepend(entry);
    });
};

// 페이지 로드 시 데이터 가져오기
document.addEventListener('DOMContentLoaded', getData);

writeBtn.addEventListener('click', function() {
    const authorInput = document.querySelector("#user-container input[type='text'][placeholder='작성자']");
    const passwordInput = document.querySelector("#user-container input[type='password'][placeholder='비밀번호']");
    const titleInput = document.querySelector("#write-container input[type='text'][placeholder='제목']");
    const contentInput = document.querySelector("#write-container input[type='text'][placeholder='내용을 입력하세요']");

    const author = authorInput.value;
    const password = passwordInput.value;
    const title = titleInput.value;
    const content = contentInput.value;

    // Create new entry object
    const newEntry = {
        writer: author,
        title: title,
        content: content,
        password: password,
        created_at: new Date().toLocaleDateString()
    };
    postData(newEntry);
});

const postData = async (entry) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
    });
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    const result = await response.json();
    console.log('Entry successfully posted:', result);
    getData();
};

// Call getData when the page loads
window.onload = getData;