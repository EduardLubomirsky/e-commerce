var logo = document.querySelector("logo");
var search_button = document.querySelector(".search [type='submit']");
var search_form = document.querySelector(".search");
var menu_button = document.getElementById("menu_button");
var menu = document.getElementById("main_menu");

var header= document.querySelector("header");
var filter_title = header.querySelectorAll("#filter_title>li");
var items = header.querySelectorAll(".items");
var selected_item_name = header.querySelectorAll("span.selected-item-name");
var toolbar = header.querySelectorAll("#toolbar>li");
search_button.onclick = function(event){
	event.preventDefault();
	if(search_form.classList.contains('expand')){
		search_form.classList.remove('expand');
	}else{
		search_form.classList.add('expand');
	}
}
menu_button.onclick = function(){
	if(menu.classList.contains('open')){
		menu.classList.remove('open');
		menu_button.classList.remove('open');
	}else{
		menu.classList.add('open');
		menu_button.classList.add('open');
	}
}
for(let i = 0; i < filter_title.length; i++){
	filter_title[i].onclick = function(){	
		if(this.classList.contains('open')){
			this.classList.remove('open');
			for(let i = 0; i < filter_title.length; i++){
				if(selected_item_name[i].innerText === "Not selected"){
					filter_title[i].classList.remove("selected");
				}else{
					filter_title[i].classList.add("selected");
				}
			}
		}else{
			for(let i = 0; i < filter_title.length; i++){
				filter_title[i].classList.remove('open');
				this.classList.add('open');
			}
		}
	}
}
console.log(filter_title[0].childNodes[0].data);
for(let i = 0; i < items.length; i++){
	items[i].onclick = function(){
		let itemsChildNodes = items[i].childNodes;
		selected_item_name[i].innerHTML = event.target.innerHTML;

		if (event.target.classList.contains('selected')) {
			event.target.classList.remove('selected');
		} else{
			for(let j = 1; j < itemsChildNodes.length; j+=2){
				this.childNodes[j].classList.remove('selected');
				//console.log(this.childNodes[j].innerText)

			}
			event.target.classList.add('selected');
		}
		for(let t = 0; t < items.length; t++){

			for(let k = 1; k < items[t].childNodes.length; k+=2){
				if(items[t].childNodes[k].classList.contains("selected")){
					toolbar[t].childNodes[0].innerText = items[t].childNodes[k].innerText;
					toolbar[t].childNodes[0].classList.add("select");
					if(k == 1){
						toolbar[t].childNodes[0].innerText = filter_title[t].childNodes[0].data;	
						toolbar[t].childNodes[0].classList.remove("select");
					} 
				}
				//else{
				//	toolbar[t].childNodes[0].innerText = filter_title[t].childNodes[0].data;
				//}
			}

		}

	}
}