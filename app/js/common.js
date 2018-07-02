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

var filter_open_btn = document.getElementsByClassName("toolbar")[0];
var filter_close_btn = document.getElementsByClassName("filter-close-btn")[0];

var add_to_bag = document.getElementsByClassName("item-add-to-bag")[0];

try{
	filter_open_btn.onclick = function(){
		if(!filter_open_btn.classList.contains('open')){
			filter_open_btn.classList.add('open');
		}else{
			filter_open_btn.classList.remove('open');
		}
	}
	filter_close_btn.onclick = function(){
		if(filter_open_btn.classList.contains('open')){
			filter_open_btn.classList.remove('open');
		}
	}
}catch(err){

}
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
try{
	add_to_bag.onclick = function(event){
		event.preventDefault();

		let item_photo = document.querySelector(".gallery-main img").src;
		let item_title = document.getElementsByClassName("item-title")[0].innerText;
		let item_price = document.getElementsByClassName("item-price")[0].innerText;
		let item_size  = document.querySelector(".item-size .active").innerText;
		let item_color = document.querySelector(".item-color .active").innerText;

		let item_info = {
			img: item_photo,
			title: item_title,
			price: item_price,
			size: item_size,
			color: item_color
		};

		localStorage.setItem(item_title, JSON.stringify(item_info));
	}
}catch(ex){

}
var bag_list = document.getElementById("bag_list");
//var bag_item = document.createElement("li");
//bag_item.innerText = "test";
//bag_list.appendChild(bag_item);

document.addEventListener("DOMContentLoaded", ready);
function ready() {
	try{
		for(let i = 0; i < localStorage.length; i++){
			let key = localStorage.key(i);
			let item_data = JSON.parse(localStorage.getItem(key));
			let bag_item = document.createElement("li");
			let item_remove = document.createElement("button");
			item_remove.classList.add("item-remove");
			item_remove.innerText = "Remove item";

			let item_photo = document.createElement("img")
			item_photo.src = item_data.img;

		 	let item_title = document.createElement("h2");
		 	item_title.innerText = item_data.title; 

			let item_price = document.createElement("span");
			item_price.innerText = item_data.price;
			item_price.classList.add("item-price");

			let item_size  = document.createElement("span");
			item_size.innerText = "Size: " + item_data.size;

			let item_color = document.createElement("span"); 
			item_color.innerText = "Color: " + item_data.color;

			bag_list.appendChild(bag_item);

			let info_column = document.createElement("div");
			info_column.classList.add("item-info-column");
			bag_item.appendChild(item_photo);
			info_column.appendChild(item_title);
			info_column.appendChild(item_price);
			info_column.appendChild(item_size);
			info_column.appendChild(item_color);
			info_column.appendChild(item_remove);
			bag_item.appendChild(info_column);

		}
		var item_remove_button = document.getElementsByClassName("item-remove");
		for(let i = 0; i < item_remove_button.length; i++){
			item_remove_button[i].onclick = function(event){
				let key = this.parentNode.childNodes[0].innerText;
				console.log(this.parentNode.parentNode.remove());
				localStorage.removeItem(key);	
			}
		}
	}catch(ex){ 

	}

}

