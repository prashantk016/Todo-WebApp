var json = false;
var mydata;

var addButton = document.getElementById('add-anchor'),
addtodoListener = function (evt) {
  
var todoArea = document.querySelector('.todo-area'),
    
todo_main=document.createElement('div'),
title_div=document.createElement('div'),
content_div=document.createElement('div'),
items_list=document.createElement('ul'),
newItem_div=document.createElement('div'),
input_txt=document.createElement('input'),
itemButton=document.createElement('a'),
plusImg=document.createElement('img'),
author = document.createElement('span'),
author_date_div = document.createElement('div'),
date = document.createElement('span');
    

var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
      todo_main.appendChild(span);
    span.addEventListener('click',function(e){
        
       var todo_main=this.parentNode;
       var todoArea = document.querySelector('.todo-area');
        todoArea.removeChild(todo_main);
   
    });
author.innerHTML=document.getElementsByClassName("username")[0].innerHTML;
    
date.innerHTML=new Date().toLocaleDateString();

todo_main.classList.add("todo_main");
title_div.classList.add("title");
content_div.classList.add("content");
items_list.classList.add("items");
newItem_div.classList.add("newItem");
input_txt.classList.add("text");
itemButton.classList.add("addItem");
plusImg.classList.add("addItemImg");
author_date_div.classList.add("author_date_div")
author.classList.add("author");
author.classList.add("pull-left");
date.classList.add("date");
date.classList.add("pull-right");


todo_main.appendChild(title_div);
todo_main.appendChild(content_div);
content_div.appendChild(items_list);
content_div.appendChild(newItem_div);
newItem_div.appendChild(input_txt);
newItem_div.appendChild(itemButton);
itemButton.appendChild(plusImg);
todo_main.appendChild(author_date_div);
author_date_div.appendChild(author);
author_date_div.appendChild(date);
plusImg.src="./images/add_box.png";

title_div.innerHTML="Untitled";

input_txt.type="text";
itemButton.href="#";
itemButton.addEventListener('click',addItem);
var bg_color=random_bg_color();
   
    author_date_div.style.background=bg_color;
title_div.style.background=bg_color;
position = gettodoPosition();
todo_main.style.top = position.top;
todo_main.style.left = position.left;
items_list.style.height="85%";
items_list.style.overflow="auto";

title_div.contentEditable="true";
todoArea.appendChild(todo_main);

todo_main.addEventListener('click',change_focus);

/* drag and drop note functionality*/
var mousePosition;
var offset = [0,0];
var isDown = false;
todo_main.addEventListener('mousedown', function(e) {
isDown = true;
    todo_main.style.zIndex=z++;
offset = [
    todo_main.offsetLeft - e.clientX,
    todo_main.offsetTop - e.clientY
    
];
   
}, true);

todoArea.addEventListener('mouseup',  function() {
    
    isDown = false;
}, true);

todoArea.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
    
            x : event.clientX,
            y : event.clientY
    
        };
        todo_main.style.left = (mousePosition.x + offset[0]) + 'px';
        todo_main.style.top  = (mousePosition.y + offset[1]) + 'px';
        
    }
}, true);

};

addButton.addEventListener('click', addtodoListener);

var update_date=function(evt,addButton){
    if(evt==null)
            var todo_main=addButton.parentNode.parentNode;
    else
         var todo_main=this.parentNode.parentNode.parentNode;
    var author_date=todo_main.querySelector(".author_date_div");
    var date=author_date.querySelector(".date");
    date.innerHTML=new Date().toLocaleDateString();
}

var addItem=function(evt){

var newItem=this.parentNode;
var taskString=newItem.querySelector(".text").value;
if(taskString===""){
alert("Can't add an empty task");
return;
}
newItem.querySelector(".text").value="";
var content=newItem.parentNode;
var items=content.querySelector(".items");

var listItem = document.createElement("li");
listItem.addEventListener("input",update_date);

var checkBox = document.createElement("input"); 

var label = document.createElement("label");

label.contentEditable="true";
  
label.addEventListener('keypress',function(evt){
if (evt.which === 13) {
evt.preventDefault();
} 
   
});
    

var deleteButton = document.createElement("a");

var deleteImage=document.createElement("img");
deleteImage.src="./images/delete_icon.svg";
deleteButton.appendChild(deleteImage);

checkBox.type = "checkbox";

deleteButton.className = "delete";
deleteButton.addEventListener('click', deleteItem);

label.innerText = taskString;

listItem.appendChild(checkBox);
listItem.appendChild(label);

listItem.appendChild(deleteButton);


items.appendChild(listItem);
   update_date(null,items);
}
var deleteItem=function(evt){
var parent=this.parentNode.parentNode;
parent.removeChild(this.parentNode);

}

var z=0;
var change_focus=function(evt){

this.style.zIndex=z++;
}
function random_bg_color() {
var x = Math.floor(Math.random() * 256);
var y = Math.floor(Math.random() * 256);
var z = Math.floor(Math.random() * 256);
var bgColor = "rgba(" + x + "," + y + "," + z + ",0.75)";
return bgColor;
}

var gettodoPosition = function () {
var todoSize = 250, //Width & Height of the todo
topPadding = 20, //Padding around nav bar
vPadding = 10, //Padding on both left and right end of the screen
navBarHeight = 50, //Height of the nav bar
minTop = navBarHeight + topPadding, //Min top position should be nar bar height plus top padding
maxScreenWidth = window.innerWidth - (todoSize + 2 * vPadding), //max width should exclude todo width and padding
maxScreenHeight = window.innerHeight - (todoSize + minTop), //max height should exclude todo height and padding
randomLeft = Math.ceil(Math.random() * maxScreenWidth), //Random left with max screen width
randomTop = Math.ceil(Math.random() * maxScreenHeight); //Random top with max screen height
randomTop = randomTop < minTop ? minTop : randomTop; //If random top is less than min top then use min top
randomLeft = randomLeft < vPadding ? vPadding : randomLeft; //If random left is less than vPadding then use vPadding
return {
top: randomTop,
left: randomLeft
};
}

var mousePosition;
var offset = [0,0];

var isDown = false;

function load() {
        //Send AJAX call to get the stciky dom.
        var newStickyRequest = new XMLHttpRequest();
        newStickyRequest.open('GET', 'data.json', true);
        newStickyRequest.responseType = 'text';
        newStickyRequest.onload = function (e) {
           LoadFromJSON(this.responseText);
        };
        newStickyRequest.send();
}

function LoadFromJSON(data) {
    mydata = JSON.parse(data);
    for(var i=0; i<mydata.length;i++){
        addtodoListener();
        var todoMain= document.querySelector(".todo_main");
        var todoItem = document.querySelectorAll(".title");
        
       
        todoItem[i].innerHTML=mydata[i].title;
        var items= mydata[i].items;
        if(items != null){
       
       
        for(var j=0;j<items.length;j++){
                var itemInput = document.querySelectorAll(".text");
                var addItemlist = document.querySelectorAll(".addItem");
                itemInput[i].value=items[j];
                addItemlist[i].click();  
            }
        }
    }
}
