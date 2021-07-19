'use strick';

const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');

function onAdd() {
    const text = input.value;
    if(text === '') {
        alert('Please, enter a item');
        input.focus();
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({block:'start'})
    input.value = '';
    input.focus();
}

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