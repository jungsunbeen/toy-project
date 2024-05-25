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
        const inputPasswordBody = {
            password : inputPassword
        };
        deleteData(inputPasswordBody,`${data.id}`);
        passwordField.value="";
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

    if (!author || !password || !title || !content) {
        alert("모든 항목을 작성해주세요.");
        return; // 함수 종료
    }

    //새로운 방명록
    const newEntry = {
        writer: author,
        title: title,
        content: content,
        password: password,
        created_at: new Date().toISOString()
    };
    if (author.length <= 10 && password.length <= 10 && title.length <= 20) {
        postData(newEntry);
        authorInput.value = "";
        passwordInput.value = "";
        titleInput.value = "";
        contentInput.value = "";
    } else {
        if (author.length > 10) {
            alert("작성자명은 10자 이내로 작성하세요.");
        }
        if (password.length > 10) {
            alert("비밀번호는 10자 이내로 작성하세요.");
        }
        if (title.length > 20) {
            alert("제목은 20자 이내로 작성하세요.");
        }
    }
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
        const result = await response.json();
        getData();
    } catch (error) {
        console.error(error);
    }
};

const deleteData = async (inputPasswordBody,id) => {
    try {
        const response = await fetch(`${baseUrl}${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputPasswordBody)
        });
        if (response.ok) {
            getData(); // 데이터를 삭제한 후 리스트를 갱신합니다.
        } else {
            console.error('삭제 실패:', response.statusText);
            alert("비밀번호가 일치하지 않습니다.");
        }
    } catch (error) {
        console.error(error);
    }
};

// load 될 때 불러옴
window.onload = getData;