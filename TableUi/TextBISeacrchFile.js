let values = document.getElementsByName('rd')
let ckdval
let first = false
let second = false
let third = false
// console.log(window.location)
// console.log(cwd)
// let data={  
//     "employee1": {  
//         "name":       "sonoo",   
//         "salary":      56000,   
//         "married":    true  
//     },
// 	"employee2": {  
//         "name":       "sonoo",   
//         "salary":      56000,   
//         "married":    true  
//     },
// 	"employee3": {  
//         "name":       "sonoo",   
//         "salary":      56000,   
//         "married":    true  
//     },
// 	"employee4": {  
//         "name":       "sonoo",   
//         "salary":      56000,   
//         "married":    true  
//     }  
// }  
function rdvalue(e) {
	// console.log('object')
	ckdval = e.target.value;
	document.getElementById('btn1').innerHTML = 'corpus'
	document.getElementById('btn2').innerHTML = 'catogery'
	document.getElementById('btn3').innerHTML = 'signal'
	if (ckdval == 'corpus') {
		first = true
		document.getElementById('btndiv').style.display = 'block'
	} else {
		first = false
		second = false
		third = false
		document.getElementById('btndiv').style.display = 'none'
	}
}
function eventaddtion1(event) {
	if (first) {
		// this to remove list if all list visible and 
		// corpus is selected

		document.getElementById('ul1').classList.toggle('disp')
		const target = event.target;
		if (target.tagName === 'LI') {
			document.getElementById('ul2').classList.add('disp')
			document.getElementById('ul3').classList.add('disp')
			second = true
			third = false
			document.getElementById('btn1').innerHTML = target.innerHTML;
		}
	}
}
function eventaddtion2(event) {
	if (second) {
		document.getElementById('ul3').classList.add('disp')
		document.getElementById('ul2').classList.toggle('disp')
		const target = event.target;
		if (target.tagName === 'LI') {
			third = true
			document.getElementById('btn2').innerHTML = target.innerHTML;
		}
	}
}


let siganlDataList = ['signal11111111', 'signal2', 'signal3', 'signal4']
let text
function eventaddtion3(event) {
	if (third) {
		let ul3 = document.getElementById('ul3')
		text = ''
		ul3.innerHTML = ''
		for (var i = 0; i < siganlDataList.length; i++) {
			if (i == 0) {
				text += `<li title=${siganlDataList[i]} style='display:flex;'class="list_items" id="${siganlDataList[i]}" data-signal_anchor_entity="${siganlDataList[i]}" data-corpus-id="${i}"  data-corpus-name="${i}" style='text-overflow: ellipsis;cursor: pointer;line-height:23px;font-size:15px'><span style='color:green;' id='litext'>${siganlDataList[i]}</span><span style="color:red;padding:0px 5px 0px 5px;float:right;" onClick="deleteSignalData(${siganlDataList[i]})"><i class="fa-solid fa-trash-can"></i></span></li>`;
			} else {

				text += `<li title=${siganlDataList[i]} class="list_items" style='display:flex;' id="${siganlDataList[i]}" data-signal_anchor_entity="${siganlDataList[i]}" data-corpus-id="${i}"  data-corpus-name="${i}" style='text-overflow: ellipsis; cursor: pointer;line-height:23px;font-size:15px'><span style='color:green;' id='litext'>${siganlDataList[i]}</span><span style="color:red;padding:0px 5px 0px 5px;float:right;" onClick="deleteSignalData(${siganlDataList[i]})"><i class="fa-solid fa-trash-can"></i></span></li>`;
			}
		}

		ul3.innerHTML = text.replaceAll('undefined', '')

		// for(let i=0;i<3;i++){
		// 	let li=document.createElement('li')
		// 	// li.setAttribute('class',"fa-solid fa-trash")
		// 	li.innerHTML=`signal${i+1}<span style="color:red;padding:0px 5px 0px 5px;" onClick="deleteSignalData(event)"><i class="fa-solid fa-trash-can"></i></span>`
		// 	// li.innerHTML=`<i class="fa-solid fa-trash-can"></i>`
		// 	ul3.appendChild(li)
		// }
		ul3.classList.toggle('disp')
		const target = event.target;
		if (target.tagName === 'LI' || target.tagName === 'SPAN') {
			// const signal1 = target.innerHTML.match(/(.*?)<span/);
			// const spanTag = target.innerHTML.match(/<span[^>]*>.*?<\/span>/);
			// console.log(target.innerHTML)
			document.getElementById('btn3').innerHTML = target.innerHTML
		}
	}
}
function initialize() {
	document.getElementById('btn1').addEventListener('click', eventaddtion1);
	document.getElementById('btn2').addEventListener('click', eventaddtion2);
	document.getElementById('btn3').addEventListener('click', eventaddtion3);
	const ul1 = document.getElementById('ul1');
	const ul2 = document.getElementById('ul2');
	const ul3 = document.getElementById('ul3');
	ul1.addEventListener('click', eventaddtion1);
	ul2.addEventListener('click', eventaddtion2);
	ul3.addEventListener('click', eventaddtion3);

	document.body.addEventListener('click', function (event) {
		const target = event.target;
		const ul1 = document.getElementById('ul1');
		const ul2 = document.getElementById('ul2');
		const ul3 = document.getElementById('ul3');
		const btn1 = document.getElementById('btn1');
		const btn2 = document.getElementById('btn2');
		const btn3 = document.getElementById('btn3');
		// console.log(!ul1.contains(target))
		// console.log(!ul2.contains(target))
		// console.log(!ul3.contains(target))
		// console.log(target !== btn1)
		// console.log(target !== btn2)
		// console.log(target !== btn3)

		if (
			!ul1.contains(target) &&
			!ul2.contains(target) &&
			!ul3.contains(target) &&
			target !== btn1 &&
			target !== btn2 &&
			target !== btn3
		) {
			ul1.classList.add('disp');
			ul2.classList.add('disp');
			ul3.classList.add('disp');
		}
	});
}
initialize();
function deleteSignalData(id) {
	Swal.fire({
		title: 'Are you sure want to delete?',
		// text: "You won't be able to revert this!",
		// icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'delete'
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire(
				'Deleted!',
				'',
				'success'
			)
		}
	})
	console.log('deleting', id.id)
}

function views(e) {
	if (e.target.includes('text view')) {
		console.log(e.target)
	}
	else if (e.target.includes('graph view')) {
		console.log(e.target)
	}
}
function textAndGraphTab(evt, view_1, view_2) {
	// console.log(evt.target, view_1, view_2)
	var view1Element = document.getElementById(view_1);
	var view2Element = document.getElementById(view_2);
	// console.log('text=',document.querySelector(`${'#'+view_1}`).innerHTML)
	// console.log('graph=',document.querySelector(`${'#'+view_2}`).innerHTML)
	//   console.log("line 384.......",view1Element,view2Element);
	if (evt.target.innerHTML == 'text view' && view1Element.style.display == "none" && view2Element.style.display == "block") {
		// console.log('text')
		view1Element.style.display = "block";
		view2Element.style.display = "none";
		evt.target.style.backgroundColor = 'red'
		document.getElementById('viewbtn2').style.backgroundColor = 'white'
		// console.log('text=',view1Element.style.display,'graph=',view2Element.style.display)
		//   document.getElementById("graph_view_btn").classList.remove("tabdeactive");
		//   document.getElementById("graph_view_btn").style.backgroundColor = "#9b9696";
		//   document.getElementById("text_view_btn").classList.remove("tabactive");
		//   document.getElementById("text_view_btn").style.backgroundColor = "steelblue";
		//   document.getElementById("text_view").style.display = "none";
		//   AllegroGraph_Viva.prototype.centerTheGraph1()
		//AllegroGraph_Viva.prototype.toggleNodeNames()
		//   if(document.getElementById("graph_search").style.display === "none" && document.getElementById("svgIdentity0").style.display === "none"){
		// 	  document.getElementById("graph_search").style.display = "block"
		// 	  document.getElementById("svgIdentity0").style.display = "block"
		//   }
		// AllegroGraph_Viva.prototype.centerTheGraph()
	}
	if (evt.target.innerHTML == 'graph view' && view1Element.style.display == "block" && view2Element.style.display == "none") {
		view1Element.style.display = "none";
		view2Element.style.display = "block";
		document.getElementById('viewbtn1').style.backgroundColor = 'white'
		evt.target.style.backgroundColor = 'red'
		// console.log('text')
		// console.log('graph')
		// 	 console.log("line number 404.....",view1Element)
		//   document.getElementById("text_view_btn").style.backgroundColor = "#9b9696";
		//   document.getElementById("text_view").style.display = "block";
		//   document.getElementById("graphviews0").style.display = "none";
		//   document.getElementById("graph_view_btn").style.backgroundColor = "steelblue";
	}


}

// function disableZoom(){
// 	function disablezoom(e) {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		let scale
// 		let tx
// 		let ty
// 		if (e.ctrlKey) {
// 			var s = Math.exp(-e.deltaY / 100);
// 			scale *= s;
// 		} else {
// 			var direction = 1;
// 			tx += e.deltaX * direction;
// 			ty += e.deltaY * direction;
// 		}
// 		var transform = 'translate(' + tx + 'px, ' + ty + 'px) scale(' + scale + ')';
// 		document.body.style.webkitTransform = transform;
// 		document.body.style.transform = transform;
// 	}
// 	document.addEventListener('wheel',disablezoom,{passive: false});
// 	document.addEventListener('keydown', function (e) {
// 		if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '0')) {
// 			e.preventDefault();
// 		}
// 	});
// }

// disableZoom()



var originalWidth = screen.width;
var maxAllowedWidth = 0.75 * originalWidth;
window.addEventListener('resize', function () {
	var loader = document.getElementById("loader");
	var screenWidth = window.innerWidth;
	if (screenWidth <= 1300) {
		//   loader.style.width = "1300px"
		// document.body.style.maxWidth = "100px";
		document.body.style.minWidth = "1300px";
		console.log('<1300', screenWidth)
		document.getElementById("btn1").style.width = "auto";
		// document.getElementById("icorpus_modal").style.width = "100%"
		// document.getElementById("create_corpus_modal").style.width = "auto";
		// document.getElementById("Refresh").style.width = "auto";
		// document.body.style.overflowX = "auto";
	} else {
		console.log('>1300', screenWidth)
		// loader.style.width = "1360px"
		document.getElementById("btn1").style.width = "80px";
		document.body.style.minWidth = "1300px";
		// document.getElementById("FactCheck").style.width ="100vw";
		// document.getElementById("create_corpus_modal").style.width = "14%";
		// document.getElementById("icorpus_modal").style.width = "92%"
		// document.getElementById("Refresh").style.width = "6%";
		// document.body.style.overflowX = "hidden";
	}
});