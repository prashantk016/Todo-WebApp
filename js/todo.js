
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
    plusImg=document.createElement('img');

    todo_main.classList.add("todo_main");
    title_div.classList.add("title");
    content_div.classList.add("content");
    items_list.classList.add("items");
    newItem_div.classList.add("newItem");
    input_txt.classList.add("text");
    itemButton.classList.add("addItem");
    plusImg.classList.add("addItemImg");

    todo_main.appendChild(title_div);
    todo_main.appendChild(content_div);
    content_div.appendChild(items_list);
    content_div.appendChild(newItem_div);
    newItem_div.appendChild(input_txt);
    newItem_div.appendChild(itemButton);
    itemButton.appendChild(plusImg);
    plusImg.src="./images/ic_add_black_24px.svg";
    title_div.innerHTML="Untitled";
    input_txt.type="text";
    itemButton.href="#";
    itemButton.addEventListener('click',addItem);

    title_div.style.background=random_bg_color();
    position = gettodoPosition();
    todo_main.style.top = position.top;
    todo_main.style.left = position.left;
    items_list.style.height="85%";
    items_list.style.overflow="auto";

    title_div.contentEditable="true";
    todoArea.appendChild(todo_main);

    todo_main.addEventListener('click',change_focus);
    };

    addButton.addEventListener('click', addtodoListener);

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


    var checkBox = document.createElement("input"); 

    var label = document.createElement("label");

    label.contentEditable="true";
    label.addEventListener('keypress',function(evt){
    if (evt.which === 13) {
    evt.preventDefault();
    } 
    });
        
    var editInput = document.createElement("input"); 

    var editButton = document.createElement("a");

    var deleteButton = document.createElement("a");
    var editImage=document.createElement("img");
    var deleteImage=document.createElement("img");
    editImage.src="./images/edit_icon.svg";
    deleteImage.src="./images/delete_icon.svg";
    editButton.appendChild(editImage);
    deleteButton.appendChild(deleteImage);


    checkBox.type = "checkbox";
    editInput.type = "text";


    editButton.className = "edit";

    deleteButton.className = "delete";
    deleteButton.addEventListener('click', deleteItem);

    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(deleteButton);
    listItem.appendChild(editButton);


    items.appendChild(listItem);

    }
    var deleteItem=function(evt){
    var parent=this.parentNode.parentNode;
    parent.removeChild(this.parentNode);

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