import {content} from './util.js';  


let themeButton = document.getElementById('Darkmode?')

//TODO refactor and move out of hereeeeeeeeeeeeeeeeeee (ㆆ _ ㆆ)
themeButton.addEventListener('click', () => {
  if (document.body.className == 'dark') {
    document.body.classList.remove('dark'); document.body.classList.add('light') ; localStorage.setItem('themeMode', 'light');
  } else {
    document.body.classList.remove('light'); document.body.classList.add('dark') ; localStorage.setItem('themeMode', 'dark');
  }
})

const themeMode = localStorage.getItem('themeMode') || 'light';

// initial theme
if (themeMode === 'dark') {
  document.body.classList.add('dark');
} else {
  document.body.classList.add('light');
}

// buttons
const btnImportExport = document.getElementById('importExport');
const btnArrowFun = document.getElementById('arrowFunc');
const btnArrMethods = document.getElementById('arrayMethods');
const btnDestructuring = document.getElementById('destructuring');

// div
const tabContent = document.getElementById('tab-content')

function displayContent (items) {
  let codeNode = document.createElement('code')
  let preNode = document.createElement('pre')
  //codeNode.textContent = '';
  tabContent.innerHTML = '';

  codeNode.textContent = items.join("\n")  
  codeNode.classList.add("language-javascript")
  preNode.appendChild(codeNode)
  tabContent.appendChild(preNode)
  Prism.highlightAll();
}


// Map button IDs to content local
const buttonToContentMap = {
  'importExport': 0,
  'arrowFunc': 1,
  'arrayMethods': 2,
  'destructuring': 3,
};

function handleClick(event) {
  const btnId = event.target.id;
  highLightBtn(event.target);

  const contentIndex = buttonToContentMap[btnId];
  if (typeof contentIndex !== 'undefined') {
    displayContent(content[contentIndex]);
    localStorage.setItem('lastClicked', btnId);
  }
}
// on page reload
const lastClickedButtonId = localStorage.getItem('lastClicked');
if (lastClickedButtonId) {
  displayContent(content[buttonToContentMap[lastClickedButtonId]]);
} else {
  displayContent(content[0])
  highLightBtn(btnImportExport)
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', handleClick);
});


// TODO: Refactor this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function highLightBtn(btn) {
  // clear styles
  btnImportExport.className = "";
  btnArrowFun.className = "";
  btnDestructuring.className = "";
  btnArrMethods.className = "";
  btn.className = "active"; // set new style / highlight
}


