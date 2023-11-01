	let selectedCorpusId = null;
	let categoryListenersAdded = false;
	let signalListenersAdded =false;
	function ShowIcorPus(){	
		if(second.checked == true){
			document.getElementById("dropDowns").style.display ="block"
			document.getElementById("firtstDrop").innerHTML ="Corpus"
			document.getElementById("secondDrop").innerHTML ="Category"
			document.getElementById("thirdDrop").innerHTML ="Signal"
			document.getElementById("searchICon").style.display ="none"
			document.getElementById("searchBox").style.marginTop="-1%"
			document.getElementById("corpusText").style.color ="black";
			document.getElementById("corpusText").style.fontWeight ="700";
			document.getElementById("searchICon").value ="";			
			document.getElementById("secondDrop").style.display ="block";
			document.getElementById("thirdDrop").style.display ="block";
			// document.getElementById("searchText").style.fontWeight ="400";
			// document.getElementById("searchText").style.color ="gray"
			document.getElementById("playground_label").style.color ="gray";
			document.getElementById("playground_label").style.fontWeight= "400";
			document.getElementById("signal_text").style.color ="black";
			document.getElementById("signal_text").style.fontWeight ="700"
			document.getElementById("signals").checked = true;
			document.getElementById("OpenTextIcon").style.display ="none"
			document.getElementById("corpusSearchBox").keypress =null;
			document.getElementById("save_signal").style.display="none"

			resetData();
			var corpusUrl ="/getCorpusNames";
			var listItem =[];
  		var esgDocsCount =""
  		let userID;
  		var corpus_name ="";
  		var corpus_id;
  		var showCorpus =""
			// var reqObj= JSON.stringify({"corpusFlag":corpusFlag});
			sendJQueryAjaxAsyncReq(corpusUrl).then(async(resp)=>{
				if(resp.redirected){
	        		window.location.assign(resp.url)
	        		return
	        	}else{
	        		var res = await resp;
	        		var corpusData = JSON.parse(resp);
	        		var corpus_list = corpusData.orgs_lst;
	        		corpus_list.forEach((rowData)=>{
	        	 corpus_name = rowData.corpus_name;
      			 corpus_id = rowData.corpus_id;
      			 show_corpus_name = rowData.display_corpus_name
	        			 listItem.push({ corpus_name: corpus_name, corpus_id: corpus_id, show_corpus_name:show_corpus_name });
	        			var userInfoHtml = getEle("corpus_name");
		        		esgDocsCount = corpusData.corpus_count;
		        		userID = corpusData.user_id;
		        		})
	        		corpusAllData(listItem,esgDocsCount,corpus_name,selectedCorpusId);
	        		
	        	}		
			});
		}
		if(open_text_search == "no"){
			document.getElementById("searchField").checked =false;
			document.getElementById("searchField").disabled = true;
		}else{
			document.getElementById("searchField").checked =true;
			document.getElementById("signals").checked = false;
			document.getElementById("signal_text").style.color ="gray";
			document.getElementById("signal_text").style.fontWeight ="400";
			document.getElementById("searchText").style.color ="black";
			document.getElementById("searchText").style.fontWeight ="700";
			document.getElementById("searchField").disabled = false;
		}
		if(document.getElementById("searchField").checked ==true && second.checked == true){
			document.getElementById("secondDrop").style.display = "none";
			document.getElementById("thirdDrop").style.display ="none"
		}
		
		document.getElementById("first").checked = false;
		document.getElementById("firtstDrop").disabled = false;
		document.getElementById("firtstDrop").style.backgroundColor ="steelblue"
		document.getElementById("secondDrop").disabled = false;
		document.getElementById("secondDrop").style.backgroundColor ="steelblue"
		document.getElementById("thirdDrop").disabled = false;
		document.getElementById("thirdDrop").style.backgroundColor ="steelblue";
		document.getElementById("upload_div").style.display ="none";
		document.getElementById("signal_boxs").style.display ="block"
		document.getElementById("signl_def").style.display ="none";
		document.getElementById("pieChartContent").style.display ="none"
		// document.getElementById("searchText").style.color ="gray"
		if(document.getElementById("summary").innerHTML != null){
			document.getElementById("summary").innerHTML = ""
		}
		// document.getElementById("searchICon").style.display ="none";
		document.getElementById("FactCheck1").style.display ="none"
		if(document.getElementById("searchICon").value !=""){
			document.getElementById("searchICon").value ="	"
		}	
		
	}

function corpusAllData(list,corpusDocsCount,corpus_name,show_coprus_name,corpus_id) {
		var corpusUlId = document.getElementById("corpus");
		signalListenersAdded =false;
  	categoryListenersAdded = false;
  let text = "";
		for (var i = 0; i < list.length; i++) {
    	if (i === 0) {
      	text += `<li class="list_items" data-corpus-id="${list[i].corpus_id}" style='cursor: pointer;line-height:23px;font-size:15px'>${list[i].show_corpus_name}</li>`;
    	}else{
      	text += `<li class="list_items" data-corpus-id="${list[i].corpus_id}" style='cursor: pointer;line-height:23px;font-size:15px'>${list[i].show_corpus_name}</li>`;
    	}
  	}
		  corpusUlId.innerHTML = text;
		  const list_Items = corpusUlId.querySelectorAll('.list_items');
		  var buttonCorPus = document.getElementById("firtstDrop");
		  buttonCorPus.addEventListener("click", function () {
		     corpusUlId.classList.toggle("show")
		    if(document.getElementById("signl_def").style.display == "block"){
			  	document.getElementById("signl_def").style.display = "none"
			  	document.getElementById("searchICon").style.display = "none"
			  }
			  
		  });
		
		document.addEventListener("click", function(event) {
		    if (!buttonCorPus.contains(event.target)) {
		    		//corpusUlId.classList.remove("show")
		        corpusUlId.style.display = "none";
		    }
		});
		  corpusUlId.addEventListener("click", function (event){
		  	const clickedItem = event.target;
		  	corpusUlId.classList.toggle("show")
			  if (!clickedItem.classList.contains('list_items')) {
			    return;
			  }

		    const selectedItemText = event.target.textContent;
		    const selectedCorpusID = event.target.dataset.corpusId;
		    corpus_id = selectedCorpusID;
		     const selectedItem = list.find(item => item.corpus_id == selectedCorpusID);
		    if(selectedItem) {		     
		      event.target.classList.add('selectedList');
		      document.getElementById("firtstDrop").textContent = selectedItem.show_corpus_name;
		      document.getElementById("secondDrop").innerHTML = "Category";
		      document.getElementById("thirdDrop").innerHTML = "Signal";
		      resetData()
		      if(document.getElementById("searchField").checked == true && document.getElementById("second").checked == true){	        		
	        		document.getElementById("searchICon").style.display ="none";
	        		document.getElementById("OpenTextIcon").style.display ="block";
	        		document.getElementById("corpusSearchBox").value ="";
	        		document.getElementById("corpusSearchBox").focus();
	        		document.getElementById("corpusSearchBox").keyPress = null;	      
	        		searchQueryByUser1(selectedItem.corpus_name,corpus_id);
		        	}else{		      
					      var getIcorpusConfigInfo = "/updateCorpusNameInSess?es_index_name=" + selectedItem.corpus_name
					      sendAsyncPost(getIcorpusConfigInfo, JSON.stringify({}), (err, resp) => {
					        if(resp){				        		        	
					          showCategory(selectedItem.corpus_name,selectedItem.corpus_id)
					        }		        
			      		});
		     			}
		   	}
		  });
	}
		


function updateCorpusInSess(corpus_name){
		TextBi.corpus_name = corpus_name;
		var getIcorpusConfigInfo = "/updateCorpusNameInSess?es_index_name="+corpus_name;
			sendAsyncPost(getIcorpusConfigInfo,JSON.stringify({}),(err,resp)=>{
			});
	}



	//get the all category list from the server side 
	function showCategory(corpus_name, corpus_id) {
  var categoryUrl = "/getCategoryNames?corpus_id=" + corpus_id;
  sendJQueryAjaxAsyncReq(categoryUrl).then(async (resp) => {
    if (resp.redirected) {
      window.location.assign(resp.url)
      return;
    } else {
      var result = await resp;
      var category_data = JSON.parse(result);
      var categoryDataList = category_data.category_lst;
      showCategoryList(categoryDataList, corpus_name, corpus_id);
    }
  });
}



	function showCategoryList(categoryDataList, corpus_name, corpus_id) {
  var category_id = document.getElementById("category");
  let text = "";
  for (var categoryData of categoryDataList) {
    const listItemHtml = `<li class='cat_lst' data-corpus-id="${corpus_id}" style='cursor: pointer;line-height:23px;font-size:15px'>${categoryData}</li>`;
    text += listItemHtml;
  }
  category_id.innerHTML = text;

	 if(!categoryListenersAdded) {
	  var buttonCategory = document.getElementById("secondDrop");

	  buttonCategory.addEventListener("click", function(event){
	  	console.log("line number 690.........");
	    //category_id.style.display = "block";
	    if(category_id.style.display === "block"){
	    	category_id.style.display = "none";
	    }else{
	    	category_id.style.display ="block"
	    }
	  });
	  categoryListenersAdded = true
	  
	}
	category_id.addEventListener("click", handleCategoryClick);
 
  function handleCategoryClick(event) {
    const select_category = event.target.textContent;
    selectedCorpusId = event.target.dataset.corpusId; // Update the selectedCorpusId
    //category_id.classList.remove("show");
    category_id.style.display ="none"
    document.getElementById("secondDrop").textContent = `${select_category}`;
    showSignls(selectedCorpusId, corpus_name);
    category_id.removeEventListener("click",handleCategoryClick);
    categoryListenersAdded = false;

  }

  document.addEventListener("click", function(event) {
		    if (!buttonCategory.contains(event.target)) {
		    		//category_id.classList.remove("show")
		        category_id.style.display = "none";
		    }
		});
 	
  //listItem.removeEventListener("click", categoryClickHandler);
}



	//get the signal names usign corpus name and category name
	function showSignls(corpus_id, corpus_name){
  var signal_url = "/getSignalNames?corpus_id=" + corpus_id;
  sendJQueryAjaxAsyncReq(signal_url).then(async (resp) => {
    if (resp.redirected) {
      window.location.assign(resp.url);
      return;
    } else {
      var result = await resp;
      var signal_data = JSON.parse(result);
      var siganlDataList = signal_data.signal_lst;
      if (siganlDataList === undefined) {
        siganlDataList = [];
      }
      showSignalsDetails(siganlDataList, corpus_id, corpus_name);
    }
  });
}




function showSignalsDetails(siganlDataList, corpus_id, corpus_name) {
  if (siganlDataList.length === 0) {
    showMessage("No signal for this corpus " + corpus_name, "");
    document.getElementById("signl_def").style.display = "none";
  }
  var signal_div = document.getElementById("signal");
  let text = "";

  for (var i = 0; i < siganlDataList.length; i++) {
    if (i == 0) {
      text += `<li class="list_items" data-siganl-id="${siganlDataList[i].signal_id}" data-signal_anchor_entity="${siganlDataList[i].signal_anchor_entity}" data-corpus-id="${corpus_id}" style='cursor: pointer;line-height:23px;font-size:15px'>${siganlDataList[i].signal_name}</li>`;
    } else {
      text += `<li class="list_items" data-siganl-id="${siganlDataList[i].signal_id}" data-signal_anchor_entity="${siganlDataList[i].signal_anchor_entity}" data-corpus-id="${corpus_id}" style='cursor: pointer;line-height:23px;font-size:15px'>${siganlDataList[i].signal_name}</li>`;
    }
  }

  signal_div.innerHTML = text;


  var buttonSignal = document.getElementById("thirdDrop");
  signal_div.removeEventListener("click",handleButtonSignalClick)
  buttonSignal.addEventListener("click", handleButtonSignalClick);

   function handleButtonSignalClick() {
   signal_div.style.display = signal_div.style.display === "block" ? "block" : "block";
   //signal_div.classList.toggle("show");
   signal_div.onclick = event => {
    const selectSignal = event.target;
    if (!selectSignal.classList.contains("list_items")) return;
    const signal_name = event.target.textContent;
    const signal_anchor_entity = event.target.dataset.signal_anchor_entity;
    let signal_id = event.target.dataset.siganlId;
		selectedCorpusId = event.target.dataset.corpusId;
		document.getElementById("thirdDrop").textContent = signal_name;
		signal_div.style.display = "none";
		getAllSignalDefinations(corpus_id, signal_id);
		getAllNERTypeValues(corpus_name, corpus_id, signal_name, signal_anchor_entity);
		event.preventDefault();
  };
}

  document.addEventListener("click", handleDocumentClick);

  function handleDocumentClick(event) {
    if (!buttonSignal.contains(event.target)) {
      //signal_div.style.display = "none";
      signal_div.classList.remove("show");
    }
  }
  let clickHandled = false;
  signal_div.addEventListener("click", function onClick(event) {
    const selectSignal = event.target;
    if (!selectSignal.classList.contains("list_items")) {
      return;
    }
    signal_div.classList.toggle("show");
    const signal_name = event.target.textContent;
    var signal_anchor_entity = event.target.dataset.signal_anchor_entity;
    let signal_id = event.target.dataset.siganlId;
    document.getElementById("thirdDrop").textContent = `${signal_name}`;
    document.getElementById("searchICon").style.display = "block";
 		document.getElementById("OpenTextIcon").style.display ="none";   
    let searchBox = document.getElementById("searchBox");
    searchBox.focus();
    document.getElementById("definition_header").textContent = "Signal Definition";
    document.getElementById("signl_def").style.display = "block";
    document.getElementById("searchICon").style.marginTop = "3%";    
    });

}