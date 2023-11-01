let count = 0
let textdiv = document.getElementById('textdiv')
let h1tag = document.getElementById('h1tag')
let inputdiv = document.getElementById('inputdiv')
let inputval = document.getElementById('inputval')
let maininpdiv = document.getElementById('maininpdiv')
let closebtn = document.getElementById('closebtn')
let listdiv = document.getElementById('listdiv')
let searchdiv1 = document.getElementById('searchdiv1').style.display = 'none'
// listdiv.style.display = 'none'
// maininpdiv.style.display = 'none'
// inputdiv.style.display = 'none'
//  window.onload=()=>{
//      window.pageXOffset=0
//      window.pageYOffset=0
//     console.log('object',window.pageYOffset)
//  }
// window.addEventListener('resize', () => {
//     // console.log('IW=',window.innerWidth)
//     // console.log('CW',document.body.clientWidth)
//     // console.log('DCW=',document.documentElement.clientWidth)
//     const pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//     // console.log('PW=',pageWidth)
//     if (pageWidth < 1930 && pageWidth > 1300) {
//         console.log('width 80-125')
//     }
//     if (pageWidth < 6100 && pageWidth > 2050) {
//         console.log('above 25-75')
//     }
//     if (pageWidth < 1025 && pageWidth > 625) {
//         console.log('above 150-250')
//     }
// })
// let arr=['one','two','three','four','five']

function rd(event) {
    if (event == 'esg') {
        textdiv.style.display = 'block'
        h1tag.innerHTML = ''
        inputdiv.style.display = 'none'
    }
    if (event == 'corpus') {
        textdiv.style.display = 'none'
        h1tag.innerHTML = 'corpus implementation'
        inputdiv.style.display = 'none'
    }
    if (event == 'inputval') {
        h1tag.innerHTML = ''
        textdiv.style.display = 'none'
        inputdiv.style.display = 'flex'
        maininpdiv.style.display = 'block'
    }
}
closebtn.addEventListener('click', () => {
    maininpdiv.style.display = 'none'
    inputval.checked = false
})
function show(event) {
    event.preventDefault()
    console.log(event.key)
    textchange(event)
}
function textchange(event) {
    // console.log('object')
    var words_limit = 199;
    var alphanumericRegex = /^[a-zA-Z0-9\s,.?]+$/;
    var openTextSearch = document.getElementById('query');
    var user_query = openTextSearch.value
    if (user_query.startsWith(' ')) {
        console.log('space', user_query.startsWith(' '))
        openTextSearch.value = user_query.trimStart()
    }
    if (user_query.length >= words_limit) {
        console.log(event)
        console.log('object')
        showMessage("Question Limit 200 character Only", "")
        openTextSearch.disabled = true
    }
    if (event.key == 'Enter') {
        event.preventDefault();
        if (user_query == "") {
            showMessage("Please enter your question", "");
            return false
        } else if (user_query != "" && user_query == " ") {
            showMessage("Question can not be blank", "");
            return false
        } else if (user_query.length >= words_limit) {
            showMessage("Question Limit 200 character Only", "")
            return false
        }
        else if (!alphanumericRegex.test(user_query)) {
            showMessage("Special character are not allowed", "");
            return false
        }
        else {
            alert('performing search')
        }
    }
    // QuerySearchButton.removeEventListener('click',,true)
}
function showMessage(title, message) {
    swal.fire({
        title: title,
        text: message,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#1fa3e0',
        confirmButtonText: 'OK',
    }).then(() => {
        var openTextSearch = document.getElementById('query');
        openTextSearch.disabled = false
    })
}
function showMessage1(title, message) {
    swal.fire({
        title: title,
        text: message,
        confirmButtonColor: '#1fa3e0',
        confirmButtonText: 'OK',
        closeOnConfirm: true,
    })
}

let details = {
    organizations: ['flipcart', 'micro', 'amazon', 'walmart'],
    companies: ['flipcart1', 'micro1', 'amazon1', 'walmart1']
}
const query = document.getElementById('query');
const qbtn = document.getElementById('QuerySearchButton');
const list = document.getElementById('list');
const listItems = list.getElementsByTagName('li');
let intitial = query.scrollHeight
query.textContent = ''
let condition = false
let listdata;
function incre(event) {
    list.innerHTML = ''
    let fildata = Object.entries(details).filter((element, id) => {
        if (query.value.includes('comp') && query.value.includes('organi')) {
            alert('select anyone of the value and go further....')
        }
        else {
            if (query.value.includes('comp') && element[0].includes('comp')) {
                // if (!query.value.includes('organi')) {
                if (query.value.includes('organi')) {
                    return
                } else {
                    listdiv.style.display = 'block'
                    element[1].forEach(company => {
                        let li = document.createElement('li')
                        li.textContent = company
                        list.appendChild(li)
                    })
                    return element
                }
                // }
            }
            if (query.value.includes('organi') && element[0].includes('organi')) {
                if (query.value.includes('comp')) {
                    return
                } else {
                    listdiv.style.display = 'block'
                    element[1].forEach(company => {
                        let li = document.createElement('li')
                        li.textContent = company
                        list.appendChild(li)
                        // console.log(list)
                    })
                    return element
                }
            }
            // }
            listdiv.appendChild(list)
        }
    });

    let selectedIndex = -1;
    if ((query.value.includes('comp') || query.value.includes('organi')) && !condition) {
        query.addEventListener('keydown', listiterate);
        condition = true
    }
    function listiterate(event) {
        let value = query.value
        const lis = list.querySelectorAll('li');
        if (event.key === 'Enter') {
            if (listdata) {
                event.preventDefault();
                // query.removeEventListener('keydown', listiterate);
                list.innerHTML = '';
                // console.log('183', query.value.indexOf('comp'), query.value.indexOf('organi'))
                let dt = ((query.value.includes('comp') ? query.value.indexOf('comp') : query.value.indexOf('organi')))
                // query.value.indexOf('comp')||query.value.indexOf('organi')
                const substring = value.substring(dt);
                // console.log(value.replace(substring,'hii'))
                // console.log(value.replace(substring,'hii'))
                // console.log(value)
                // console.log(substring)
                // console.log(query.value)
                const newValue = value.replaceAll(new RegExp(substring, 'g'), listdata);
                query.value = newValue
                condition = true
                selectedIndex = -1;
                listdata = ''
            }
        }
        else if (event.key === 'ArrowDown' && selectedIndex < lis.length - 1) {
            // Move down the list
            selectedIndex++;
            updateSelection();
            event.preventDefault(); // Prevent page scrolling
        } else if (event.key === 'ArrowUp' && selectedIndex > 0) {
            // Move up the list
            selectedIndex--;
            updateSelection();
            event.preventDefault(); // Prevent page scrolling
        }
    }

    // Function to update the selected item's style
    function updateSelection() {
        const lis = list.querySelectorAll('li');
        lis.forEach((li, index) => {
            if (index === selectedIndex) {
                li.classList.add('selected');
                listdata = li.textContent
                // console.log(li.textContent)
            } else {
                li.classList.remove('selected');
            }
        });
    }


    // console.log(fildata)
    if (query.disabled) {
        return
    }
    if (query.value.length >= 199) {
        console.log(query.value.length)
        query.disabled = true;
        event.preventDefault()
        showMessage()
    }
    event.preventDefault();
    if (intitial < query.scrollHeight) {
        qbtn.style.marginTop = `0px`
    }
    // console.log('length=',query.value.length)
    // console.log('ofst height=',query.offsetHeight)
    // console.log('query sh=',query.scrollHeight)
    if (query.scrollHeight <= query.offsetHeight) {
        query.style.height = `auto`
        qbtn.style.marginTop = ` 0px`
    }
    if (query.scrollHeight >= query.offsetHeight) {
        // console.log('if')
        query.style.height = `${query.scrollHeight}px`
        qbtn.style.marginTop = `${query.scrollHeight / 4}px`

    }
    else {
        let degrow = Math.ceil(query.scrollHeight / count)
        query.style.height = `${query.scrollHeight + 2 - degrow}px`
    }
}

// const div1 = document.getElementById('inpbtn1');
// const div2 = document.getElementById('inpbtn2');
// // const container = document.getElementById('container');
// const swapButton = document.getElementById('swapbtn');
// let value=true
// swapButton.addEventListener('click', () => {
//   // Swap the position of input1 and input2 in the DOM
//   const parent = div1.parentElement;
//   if(value){
//       parent.insertBefore(div2, div1);
//     // console.log(parent.insertBefore(div2, div1))
//     // div1.style.transform = 'translateY(10px)'; 
//     // div2.style.transform = 'translateY(-10px)';
//     // setTimeout(() => {
//     //     div1.style.transform = '';
//     //     div2.style.transform = '';
//     // }, 300);
//     value=false
//     }
// //container.style.transform = 'scale(1.05)';
// });

// let prompt_signal_template1 = {
//     "corpus_name": "Esg",
//     "corpus_id": 23,
//     "query": "Which organization is working with which green variable?",
//     "entities": {
//         "Which organization": "ORG",
//         "green variable": "GREEN_VARIABLE"
//     }
// }

let prompt_signal_template1 = {
    "corpus_name": "Esg",
    "corpus_id": 23,
    "query": "Which organization is working with which green variable?",
    "formated_question": "Is shell working with <ORG-1> and that <ORG-1> working on which <GREEN_VARIABLE-1> <GREEN_VARIABLE-2>?",
    "entities": {
        "<ORG-1>": "ORG",
        "<ORG-1>": "ORG",
        "<GREEN_VARIABLE-1>": "GREEN_VARIABLE",
        "<GREEN_VARIABLE-2>": "GREEN_VARIABLE"
    }
}



// let prompt_signal_template1= {'corpus_name': 'Esg',
// 'corpus_id': 23,
// 'open_text_search': 'Which organization is working with which organization and reducing which green variable by what date?',
// 'formated_open_text_search': 'query string = Is LS-ORG-1 working with LS-ORG-2 and reducing LS-GREEN_VARIABLE-1 by LS-DATE-1?',
// 'entities': {
//     'ORG-1': 'ORG',
//     'ORG-1': 'ORG',
//     'ORG-2': 'ORG',
//     'DATE-1': 'DATE',
//     'GREEN_VARIABLE-1': 'GREEN_VARIABLE',
// }}

let div = document.getElementById('editableInput')
let squery = ''
let div1 = document.createElement('div')
const entities = prompt_signal_template1['entities'];
// Object.entries(prompt_signal_template1).forEach(data => {
// if (data[0].includes('entities')) {
squery = prompt_signal_template1['formated_question'];
div.innerHTML = ''
Object.entries(entities).forEach(enty => {
    let dat = enty[0].replaceAll('<', '').replaceAll('>', '')
    // let dat=enty[0]
    // console.log(dat)
    // console.log(squery)
    squery = squery.replaceAll(enty[0], `<a href="#" id=${dat}>${dat}</a>`);
})
div1.innerHTML = squery
div.appendChild(div1)
// }
// })
const clickedEntities = {};
let txtdiv = document.getElementById('Signal_achor_entity')
let sdiv = document.getElementById('searchdiv')
let entity_colors = {
    ORG: 'blue',
    GREEN_VARIABLE: 'green',
    DATE: 'blue',
    PERSON: 'orange',
    // gpe,
    // job,
    // title,

}
Object.entries(entities).forEach(enty => {
    // console.log(enty)
    let dt = enty[0].split(' ')
    let newdata = dt[0].replaceAll('<', '').replaceAll('>', '')
    // console.log(newdata)
    const link = document.getElementById(newdata.trim());
    const val = document.querySelectorAll(`#${newdata.trim()}`)
    // console.log(link.style.color)
    val.forEach(dat => {
        dat.style.color = entity_colors[`${enty[1]}`]
        // link.style.color=entity_colors[`${enty[1]}`]
        // dat.addEventListener('click', (e) => {
        // e.preventDefault();
        if (!clickedEntities[enty[1]]) {
            let span = document.createElement('span');
            span.style.margin = '0px 5px 0px 5px'
            span.style.fontSize = '30px'
            span.innerHTML = enty[1];
            sdiv.appendChild(span);
            clickedEntities[enty[1]] = true;
            span.style.color = link.style.color;
            // console.log(link.style.color)
            // let closeButton = document.createElement('i');
            // closeButton.setAttribute('class',"fa-solid fa-circle-xmark")
            // closeButton.setAttribute('id','spanbutton')
            // closeButton.addEventListener('click', () => {
            //     sdiv.removeChild(span);
            //     delete clickedEntities[enty[1]];
            // });
            // span.appendChild(closeButton);
        }
        // });
    })
    // link.style.color=entity_colors[`${enty[1]}`]

});
let newarr
let org_1 = {
    0: 'Microsoft',
    1: 'Apple',
    2: 'Micro',
    3: 'Infosys',
}
let org_2 = {
    0: 'Microsoft1',
    1: 'Apple1',
    2: 'Micro1',
    3: 'Infosys1',
}
// let str=prompt_signal_template1['formated_question'].replaceAll('<','').replaceAll('>','').toLowerCase();
// let dbvar='org,green_variable,date'.split(',')
// async function processWordsWithPromise() {
//     return new Promise(async (resolve) => {
//         for (const words of dbvar) {
//             console.log(words);
//             const regex = new RegExp(`\\b${words}[\\w-]*`, 'g');
//             console.log(regex);
//             str = str.replace(regex, `<button class='dropbtn'onclick='getdropdown()' style="color:red;">$&</button>`);
//             console.log(str);
//         }
//         resolve();
//     });
// }

document.getElementById('listdiv').addEventListener('click', (e) => {
    // console.log(e.target)
    divlist.style.display = 'none'
    document.getElementsByClassName('dropbtn')[0].innerHTML = e.target.innerHTML
})
let new_ids = {}
async function getvalues() {
    let info = document.querySelectorAll(`#searchdiv span`)
    newarr = ''
    info.forEach(data => {
        newarr += data.childNodes[0].data + ','
    }
    )
    const newStr = newarr.replace(/,$/, "");
    // console.log(newStr)s
    maininpdiv.style.display = 'none'
    inputval.checked = false
    document.getElementById('esg').checked = true
    h1tag.style.display = 'block'
    h1tag.style.fontSize = '10px'
    let str = prompt_signal_template1['formated_question'].replaceAll('<', '').replaceAll('>', '').toLowerCase();
    let dbvar = 'org-1,green_variable-1,date-1,green_variable-2'.split(',')
    // console.log(dbvar)
    // let obj={
    //     'oihvb':'oub'
    // }
    // let dt=JSON.stringify(JSON.parse(JSON.stringify(obj)))
    // let dt=JSON.stringify(obj)
    let anchrs = document.querySelectorAll('#editableInput div a')
    anchrs.forEach(anchrs => {
        // console.log(anchrs)
        let newid = anchrs.innerHTML.replaceAll('-', '')
        // console.log(newid)
        new_ids[newid] = newid
    })
    // console.log(new_ids)
    // console.log(document.querySelectorAll('#editableInput div a'))
    dbvar.forEach(words => {
        console.log(words)
        let newid = words.replace('-', '')
        // console.log(newid)
        // console.log(words);
        const words_name = words
        const regex = new RegExp(`\\b${words}[\\w-]*`, 'g');
        // console.log(regex)
        str = str.replace(regex, `<a id=${newid} class='dropbtn' onclick='gettheOrg(event,${eventadded})' style="color:red;">$&</a>`);
    });
    // document.getElementById('h1tagbtn').disabled = true;
    h1tag.style.color = 'black'
    h1tag.innerHTML = str
    // textdiv.style.display = 'block'
    document.getElementById('searchdiv1').style.display = 'flex'
}



let org = [
    "Brufau",
    "Mika Hyotylainen",
    "Iman",
    "Mohamed Shaker El-Markabi",
    "Claudio Descalzi",
    "Duncan",
    "Chris Beam",
    "Jim Teague",
    "Majid Bin Abdullah Alkassabi",
    "Goyal",
    "Massimo Lombardi",
    "Waqar Siddiqui",
    "Ben Cook",
    "Nguyen Tam Thinh",
]
let green_variable = [
    "Corfo",
    "Grha Pertamina",
    "Hyatt Hotels",
    "ELYSIS",
    "African Petroleum Producers Organization",
    "Blackstone Group Inc.",
    "Greenko",
    "Regional Government of Aragon",
    "Credit Agricole Assurances",
    "Ohio River Valley Institute",
    "Standard",
    "WSJ Pro Private Equity",
    "EDP Renewables",
    "Alstom Group",
    "CGM",
]


let tags
let selected_data
let eventadded = false
// filteration data,disable btn nclickde anchors
let clickedanchors = {}
let allanchors = {}
let lsdiv = document.createElement('div')
lsdiv.setAttribute('id', 'lsdivc')

let anchorValueToChange
let updatedvalues = {}
function replaceAnchorValues() {
    let paravalue = document.querySelectorAll('#h1tag a')
    let newvalue = document.getElementById('h1tag').innerHTML;
    paravalue.forEach(repword => {
        let ancval = document.getElementById(`${tags}`).id
        if (repword.id == tags) {
            // console.log(repword.id,ancval)
            // const anchorTags = newvalue.match(/<a[^>]*>.*?<\/a>/g);
            const anchorTags = newvalue.split(/(<a[^>]*>.*?<\/a>)/);
            anchorTags.forEach((data, index) => {
                if (data.includes(repword.id)) {
                    // let num=repword.id.match(/\d+/g)
                    // let stg=repword.id.replace(/\d+/g, '');
                    // console.log(num[0])
                    let idupt = repword.id.replace(repword.id, `LS-${repword.id.replace(/\d+/g, '').toUpperCase()}-${repword.id.match(/\d+/g)}`)
                    updatedvalues[idupt] = anchorValueToChange
                    console.log(updatedvalues)
                    const idRegex = /id="([^"]+)"/;
                    const match = data.match(idRegex);
                    let color = match[1].replace(/\d/g, '').replace(/LS/gi).toUpperCase();
                    anchorTags[index] = `<a style="color:${entity_colors[color]}" id=${repword.id} class='dropbtn' onclick="gettheOrg(event)">${anchorValueToChange}</a>`
                }
            })
            let newstr = anchorTags.join('')
            document.getElementById('h1tag').innerHTML = newstr
            document.getElementById('h1tag').style.color = 'black'
        }
    })
}
lsdiv.addEventListener('click', (event) => {
    // console.log(event.target.innerHTML)
    anchorValueToChange = event.target.textContent
    replaceAnchorValues();
    let clickedanchorTags = document.querySelectorAll('#h1tag a')
    clickedanchors = {}
    clickedanchorTags.forEach(data => {
        clickedanchors[data.textContent] = true
        // console.log(Object.keys(clickedanchors))
    })
    const keys1 = Object.keys(allanchors);
    const keys2 = Object.keys(clickedanchors);
    const matchingKeys = keys1.filter(key => keys2.includes(key));
    if (matchingKeys.length == 0) {
        document.getElementById('h1tagbtn').disabled = false
    }
    // console.log(matchingKeys.length)
    // console.log(Object.keys(allanchors))
    // console.log(Object.keys(clickedanchors))
    // clickedanchors[document.getElementById(tags).innerHTML]=true
    // console.log(Object.entries(clickedanchors))
    document.getElementById('searchbox').value = event.target.innerHTML
    document.getElementById('lsdivc').style.display = 'none'
})
// document.getElementById('h1tagbtn').disabled = true;

function gettheOrg(e) {
    // console.log(eventadded)
    // let h1value=document.querySelectorAll('#h1tag a')
    // let newvalue=h1tag.innerHTML
    // // console.log(newvalue)
    // h1value.forEach(value=>{
    //     console.log(value.textContent)
    //     newvalue=newvalue.replace(value.textContent,'hiii')
    // })
    // // console.log(h1value.innerHTML)
    // h1tag.innerHTML=newvalue
    // console.log(newvalue)
    // h1value.textContent=newvalue
    tags = e.target.id
    document.getElementById('searchbox').value = ''
    // console.log(tags)
    if (e.target.id.includes('org')) {
        selected_data = org
    }
    else if (e.target.id.includes('green')) {
        selected_data = green_variable
    }
    // else if(e.target.id=='green_variable1'){
    //     selected_data=green_variable
    // }
    let query1 = document.getElementById('searchbox');
    query1.removeEventListener('keyup', listdata1)
    if (!eventadded) {
        let anchors = document.querySelectorAll('#h1tag a')
        anchors.forEach(data => {
            // console.log(data.textContent)
            allanchors[data.textContent] = true
        })
        query1.addEventListener('keyup', listdata1)
        eventadded = true
    }

    // if(Object.entries(clickedanchors).length == Object.entries(allanchors).length){
    // document.getElementById('send_query_btn').disabled=false;
    // document.getElementById('send_query_btn').style.backgroundColor ="steelblue"
    // }    
    lsdiv.innerHTML = ''
    function listdata1() {
        lsdiv.innerHTML = ''
        if (query1.value == "") {
            let ul = document.createElement('ul')
            selected_data.forEach(data => {
                // console.log(data)
                if (data.toLowerCase().startsWith(query1.value.toLowerCase())) {
                    // if(data.toLowerCase().startsWith(query1.value.toLowerCase())||data.toLowerCase().includes(query1.value.toLowerCase())){
                    // console.log(data)
                    let li = document.createElement('li');
                    li.innerHTML = data
                    ul.appendChild(li)
                }
            })
            lsdiv.appendChild(ul)
            document.getElementById('lsdiv').appendChild(lsdiv)
            document.getElementById('lsdivc').style.display = 'block'
        }
        else if (query1 != '' && query1.value.length > 0) {
            // console.log(query1.value.length)
            lsdiv.innerHTML = ''
            let ul = document.createElement('ul')
            selected_data.filter(data => {
                if (data.toLowerCase().startsWith(query1.value.toLowerCase()) || data.toLowerCase().includes(query1.value.toLowerCase())) {
                    console.log(data)
                    let li = document.createElement('li');
                    li.innerHTML = data
                    ul.appendChild(li)
                }
            })
            lsdiv.appendChild(ul)
            // console.log(query1)
            document.getElementById('lsdiv').appendChild(lsdiv)
            document.getElementById('lsdivc').style.display = 'block'
        }
    }
}
let searchfield = document.getElementById('searchbox')
// function showlist(){
//     let div= document.createElement('div')

//     console.log('list')
// }


function savesearch() {
    Object.entries(updatedvalues).length
    let div_value = document.getElementById('h1tag').innerHTML
    console.log(div_value)
    console.log(document.getElementById('searchbox').value)
    let exits = div_value.includes(document.getElementById('searchbox').value)
    // console.log(exits)
    if (Object.entries(updatedvalues).length >= 1 && (document.getElementById('searchbox').value.length > 3 && exits)) {
        // document.getElementById('searchbox').value=
        console.log('if=', document.getElementById('searchbox').value)
    }
    else {
        console.log('else=', document.getElementById('searchbox').value)
        document.getElementById('searchbox').value = ''
    }
    console.log('searching..............')
}
function getdrop(e, obj) {
    if (!document.getElementById(e.target.id).contains(document.getElementById(e.target.id + 'drop'))) {
        let div = document.createElement('div')
        div.setAttribute('id', e.target.id + 'drop')
        div.style.position = 'absolute'
        div.innerHTML = 'hiii'
        document.getElementById(e.target.id).appendChild(div)
    }
    if (document.getElementById(e.target.id).contains(document.getElementById(e.target.id + 'drop'))) {
        if (document.getElementById(e.target.id + 'drop').style.display == 'block') {
            document.getElementById(e.target.id + 'drop').style.display = 'none'
        } else {
            document.getElementById(e.target.id + 'drop').style.display = 'block'
        }
    }
    if (e.target.innerHTML.includes('org')) {
        console.log(e.target.innerHTML.replaceAll('-', '').toUpperCase())
    } else if (e.target.innerHTML.includes('green')) {
        console.log(e.target.innerHTML)
    } else {
        console.log('no btn')
    }
}