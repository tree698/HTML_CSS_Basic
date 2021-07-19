'use strict';
// 1. 입력 데이터를 가져온다
// 2. 엔터와 버튼 클릭으로 화면에 출력한다
// 3. 쓰레기통 클릭으로 삭제한다

// 관련 element(node)를 변수로 지정 (변수 convention 주의)
const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');

// 함수: 화면 출력과 삭제 (이벤트를 처리하는 함수는 on~으로 시작)
function onAdd () {
    if (input.value === '') {
        alert('Please, enter a list');
        input.focus();
    } else {
        // 1. 사용자 입력한 텍스트틀 받아 옴
        const text = input.value;
        // 2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
        // createList(text);
        const item = createItem(text);
        // 3. items 컨테이너 안에 새로 만든 아이템을 추가한다
        items.appendChild(item);
        // ** 새로 추가된 아이템으로 스크롤링
        item.scrollIntoView({block:'start'})
        // 4. 인풋을 초기화 한다
        input.value = ''
        input.focus();
    }
};

// function onAdd() {
//     const text = input.value;
//     if(text === '') {
//         alert('Please, enter a item');
//         input.focus();
//         return;
//     }
//     const item = createItem(text);
//     items.appendChild(item);
//     item.scrollIntoView({block:'start'})
//     input.value = '';
//     input.focus();
// }

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item_row');
    const item = document.createElement('div');
    item.setAttribute('class', 'item');
    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'item_name');
    itemName.textContent = text;
    const itemDelete = document.createElement('button');
    itemDelete.setAttribute('class', 'item_delete');
    itemDelete.innerHTML = '<i class="far fa-trash-alt"></i>'
    itemDelete.addEventListener('click', () => {
        items.removeChild(itemRow);
    });
    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item_divider');

    item.appendChild(itemName);
    item.appendChild(itemDelete);
    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);
    // items.appendChild(itemRow);

    return itemRow;
};

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        onAdd();
    }
});


