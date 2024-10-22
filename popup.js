function adjustPopupSize() {
  const halfScreenHeight = Math.floor(window.screen.height / 2);
  document.body.style.height = `${halfScreenHeight}px`;
  const output = document.getElementById('output');
  output.style.height = `${halfScreenHeight - 100}px`; // 減去其他元素的高度
}

document.getElementById('collect').addEventListener('click', () => {
  chrome.tabs.query({currentWindow: true}, (tabs) => {
    const date = new Date().toISOString().split('T')[0];
    const count = tabs.length;
    
    let markdown = `# ${date} - ${count}個標籤頁\n\n`;
    
    tabs.forEach(tab => {
      markdown += `- [${tab.title}](${tab.url})\n`;
    });
    
    document.getElementById('output').value = markdown;
  });
});

document.getElementById('copy').addEventListener('click', () => {
  const output = document.getElementById('output');
  output.select();
  document.execCommand('copy');
  
  showMessage('複製成功!');
});

function showMessage(text) {
  const message = document.getElementById('message');
  message.textContent = text;
  message.style.display = 'block';
  
  setTimeout(() => {
    message.style.display = 'none';
  }, 2000);
}

// 在 DOMContentLoaded 事件中調用 adjustPopupSize
document.addEventListener('DOMContentLoaded', adjustPopupSize);

// 在窗口大小改變時調用 adjustPopupSize
window.addEventListener('resize', adjustPopupSize);
