// popup.js
function openPopup() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    const width = 300; // 子画面宽度
    const height = 200; // 子画面高度
    const childWindow = window.open('popup.html', 'Popup', `width=${width},height=${height}`);

    // 接收子画面信息
    window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) {
            return;
        }

        switch (event.data.action) {
            case 'updateInput':
                document.getElementById('mainInput').value = event.data.value;
                break;
            case 'receiveMessage':
                alert(event.data.value);  // 接收并展示消息
                break;
        }
    });

    // 子画面关闭时隐藏遮罩层
    var checkChildWindow = setInterval(function() {
        if (childWindow.closed) {
            overlay.style.display = 'none';
            clearInterval(checkChildWindow);
        }
    }, 500);
}

document.getElementById('openPopup').addEventListener('click', openPopup);
