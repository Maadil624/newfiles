// // window.addEventListener('load', () => {
// //     // let loader = document.getElementById('loader')
// //     // let table = document.getElementById('tablediv')
// //     // let content = document.getElementById('content')
// //     // let dpdn = document.getElementById('dpdn')
// //     // console.log('object')
// //     // setTimeout(() => {
// //     //     dpdn.classList.remove('remove')
// //     //     content.setAttribute("class", "remove")
// //     //     loader.removeAttribute("class", "loader");
// //     //     // table.removeAttribute("class", "remove")
// //     // }, 1200);

// //     const firstDiv = document.querySelector('.first-div');
// //       const secondDiv = document.querySelector('.second-div');
// //     const secondDivid = document.getElementById('second');
// //     console.log(secondDivid)
// //     const firstDivHeight = firstDiv.offsetHeight;
// //     console.log('first div offset=', firstDivHeight)
// //     secondDivid.addEventListener('click', function () {
// //     console.log('iyvhib',firstDivHeight)
// //     console.log('iyvhib',secondDivid.clientHeight)
// //     // firstDiv.scrollTop(500)
// //         // Scroll to the second div while displaying it at the top of the viewport
// //         window.scroll(firstDiv,0);
// //     });
// // })
// window.addEventListener('scroll', function() {
//     const scrollY = window.scrollY;
//     console.log('Vertical Scroll Position:', scrollY);
//   });

// let ftch = fetch('data.csv')
//     .then(response => response.text())
//     .then(csvData => {
//         // Parse CSV data
//         const rows = csvData.split('\n');
//         const headers = rows[0].split(',');
//         // console.log(headers)
//         const data = rows.slice(1).map(row => {
//             const values = row.split(',');
//             // console.log(values,"at headers")
//             return headers.reduce((obj, header, index) => {
//                 // console.log("index=",index,"header=",header,"obj=",obj);
//                 obj[header] = values[index];
//                 return obj;
//             }, {});
//         });
//         setdata(data, headers);
//         // Now you have the parsed CSV data in the "data" array
//         // console.log(data);
//     })
//     .catch(error => console.error('Error fetching CSV:', error));
// var dt;
// function setdata(data, headers) {
//     dt = data
//     // console.log("63", dt)
//     let hname = document.getElementById('colid')
//     hname.innerHTML = headers[0]
//     let hfn = document.getElementById('colFn')
//     hfn.innerHTML = headers[1]
//     let hln = document.getElementById('colSn')
//     hln.innerHTML = headers[2]

//     let tb = document.getElementById('tablebody')
//     dt.map((data) => {
//         let count = 1;
//         let tr = document.createElement('tr')
//         let td1 = document.createElement('td')
//         tr.appendChild(td1)
//         let td2 = document.createElement('td')
//         tr.appendChild(td2)
//         let td3 = document.createElement('td')
//         tr.appendChild(td3)
//         td1.innerHTML = data.Name
//         td2.innerHTML = data.Age
//         td3.innerHTML = data.Email
//         tb.append(tr)
//     })
// }

// let org = [{
//     shell: { "color": "red" },

//     "manager": "green"
// }]
// // dropdown js
// let states = [
//     {
//         "state": "AndhraPradesh",
//         "districts": [
//             // "select district",
//             {
//                 "Anantapur": ['Kadalur', 'Lingamanahalli', 'Pulakurthi', 'D.Kondapuram', 'Kontanapalli'],
//             },
//             {
//                 "Chittoor": ['chi1', 'chi2', 'chi3', 'chi4', 'chi5'],
//             },
//             {
//                 "East Godavari": ['gd1', 'gd2', 'gd3', 'gd4', 'gd5'],
//             },
//             {
//                 "Krishna": ['kr1', 'kr2', 'kr3', 'kr4', 'kr5'],
//             },
//             {
//                 "Kurnool": ['ku1', 'ku2', 'ku3', 'ku4', 'ku5'],
//             }]
//     },
//     {
//         "state": "Arunachal Pradesh",
//         "districts": [
//             //   "select district",
//             {
//                 "Tawang": ['taw1', 'taw2', 'taw3', 'taw4', 'taw5'],
//             },
//             {
//                 "West Kameng": ['wk1', 'wk2', 'wk3', 'wk4', 'wk5'],
//             },
//             {
//                 "East Kameng": ['ek1', 'ek2', 'ek3', 'ek4', 'ek5'],
//             },
//             {
//                 "Papum Pare": ['pp1', 'pp2', 'pp3', 'pp4', 'pp5'],
//             },
//             {
//                 "Kurung Kumey": ['kk1', 'kk2', 'kk3', 'kk4', 'kk5'],
//             }
//         ]
//     },
//     {
//         "state": "Assam",
//         "districts": [
//             //  "select district",
//             {
//                 "Baksa": ['Bk1', 'bk2', 'bk3', 'bk4', 'bk5'],
//             },
//             {
//                 "Barpeta": ['br1', 'br2', 'br3', 'br4', 'br5'],
//             },
//             {
//                 "Biswanath": ['bs1', 'bs2', 'bs3', 'bs4', 'bs5'],
//             },
//             {
//                 "Bongaigaon": ['bo1', 'bo2', 'bo3', 'bo4', 'bo5'],
//             },
//             {
//                 "Cachar": ['ca1', 'ca2', 'ca3', 'ca4', 'ca5'],
//             }
//         ]
//     },
//     {
//         "state": "Chandigarh",
//         "districts": [
            // "select district", 
//             {
//                 "Chandigarh": ['cd1', 'cd2', 'cd3', 'cd4', 'cd5'],
//             }
//         ]
//     }
// ]
// var mylist = document.getElementById("state");
// let district = document.getElementById('district')
// let village = document.getElementById('village')
// let detail = document.getElementById('tablediv1')
// let tb = document.getElementById('stablebody')
// let statename
// let districtname
// function getstate() {
//     detail.classList.remove('display')
//     detail.classList.add('remove')
//     tb.innerHTML = ''
//     statename = mylist.value
//     district.innerHTML = ''
//     let option = document.createElement('option')
//     option.innerHTML = 'select district'
//     district.append(option)
//     if (mylist.value == 'AndhraPradesh') {
//         states.forEach((sdata, id) => {
//             // console.log(sdata)
//             sdata.districts.forEach((ddata, id) => {
//                 // console.log(sdata.state==mylist.value)
//                 if (sdata.state == mylist.value) {
//                     let option = document.createElement('option')
//                     option.innerHTML = Object.keys(ddata)
//                     district.appendChild(option)
//                     // console.log(ddata,id)
//                     // console.log(district)
//                 }
//             });
//         })
//     }
//     if (mylist.value == 'Arunachal Pradesh') {
//         states.forEach((sdata, id) => {
//             // console.log(sdata)
//             sdata.districts.forEach((ddata, id) => {
//                 if (sdata.state == mylist.value) {
//                     let option = document.createElement('option')
//                     option.innerHTML = Object.keys(ddata)
//                     district.appendChild(option)
//                 }
//             });
//         })
//     }
//     if (mylist.value == 'Assam') {
//         states.forEach((sdata, id) => {
//             // console.log(sdata)
//             sdata.districts.forEach((ddata, id) => {
//                 // console.log(sdata.state==mylist.value)
//                 if (sdata.state == mylist.value) {
//                     let option = document.createElement('option')
//                     option.innerHTML = Object.keys(ddata)
//                     district.appendChild(option)
//                 }
//             });
//         })
//     }
//     if (mylist.value == 'Chandigarh') {
//         states.forEach((sdata, id) => {
//             // console.log(sdata)
//             sdata.districts.forEach((ddata, id) => {
//                 // console.log(sdata.state==mylist.value)
//                 if (sdata.state == mylist.value) {
//                     let option = document.createElement('option')
//                     option.innerHTML = Object.keys(ddata)
//                     district.appendChild(option)
//                 }
//             });
//         })
//     }
// }
// function getdistrict() {
//     detail.classList.remove('display')
//     detail.classList.add('remove')
//     tb.innerHTML = ''
//     districtname = district.value
//     village.innerHTML = ''
//     let option = document.createElement('option')
//     option.innerHTML = 'select village'
//     village.append(option)
//     // console.log(district.value)
//     let dist = district.value
//     states.filter((d, id) => {
//         // console.log(d.state==mylist.value)
//         if (d.state == mylist.value) {
//             Object.values((d.districts)).forEach((data, id) => {
//                 // console.log(Object.keys(data))
//                 if (Object.keys(data) == dist) {
//                     Object.values(data).forEach(vilname => {
//                         vilname.forEach(d => {
//                             // console.log(d)
//                             let option = document.createElement('option')
//                             option.innerHTML = d
//                             village.appendChild(option)
//                         })
//                     })
//                 }
//             })
//         }
        // return d.state == mylist.value
//     })
// }
// function getvillage() {
//     let tr = document.createElement('tr')
//     tb.innerHTML = ''
    // console.log(village.value)
    // console.log(district.value)
    // console.log(mylist.value)
//     detail.classList.remove('remove')
//     detail.classList.add('display')
//     let td1 = document.createElement('td')
//     tr.appendChild(td1)
//     let td2 = document.createElement('td')
//     tr.appendChild(td2)
//     let td3 = document.createElement('td')
//     tr.appendChild(td3)
//     td1.innerHTML = statename
//     td2.innerHTML = districtname
//     td3.innerHTML = village.value
//     tb.append(tr)
// }

// // summary implementation\

// let tablediv = document.getElementById('summarymaindiv')
// let summarytablebody = document.getElementById('summarytb')
// const jsonData = [
//     {
//         'status': 'success',
//         'message': '',
//         'data': '[{"barr_doc_name":"BATR000020220624ei6n00009","barr_title":"Shell_giving_USD_27.5_million_to_LSU_for_new_energy_innovation_institute:_Heres_what_it_will_do.","gvr_doc_name":"","gvr_title":"","summary":"Lee Stockwell working with Shell as general manager.","ner_object":["{\"BATR000020220624ei6n00009\": {\"PERSON\": [\"<http:\/\/ls.com\/esg\/PERSON\/#Lee_Stockwell>\"], \"JOB_TITLE\": [\"<http:\/\/ls.com\/esg\/JOB_TITLE\/#general_manager>\"], \"ORG\": [\"<http:\/\/ls.com\/esg\/ORG\/#Shell>\"], \"GPE\": []}}"]}]'
//     },
//     {
//         'status': 'success',
//         'message': '',
//         'data': '[{"barr_doc_name":"BATR000020220624ei6n00009","barr_title":"Shell_giving_USD_27.5_million_to_LSU_for_new_energy_innovation_institute:_Heres_what_it_will_do.","gvr_doc_name":"","gvr_title":"","summary":"Lee Stockwell working with Shell as general manager.","ner_object":["{\"BATR000020220624ei6n00009\": {\"PERSON\": [\"<http:\/\/ls.com\/esg\/PERSON\/#Lee_Stockwell>\"], \"JOB_TITLE\": [\"<http:\/\/ls.com\/esg\/JOB_TITLE\/#general_manager>\"], \"ORG\": [\"<http:\/\/ls.com\/esg\/ORG\/#Shell>\"], \"GPE\": []}}"]}]'
//     },
//     {
//         'status': 'success',
//         'message': '',
//         'data': '[{"barr_doc_name":"BATR000020220624ei6n00009","barr_title":"Shell_giving_USD_27.5_million_to_LSU_for_new_energy_innovation_institute:_Heres_what_it_will_do.","gvr_doc_name":"","gvr_title":"","summary":"Lee Stockwell working with Shell as general manager.","ner_object":["{\"BATR000020220624ei6n00009\": {\"PERSON\": [\"<http:\/\/ls.com\/esg\/PERSON\/#Lee_Stockwell>\"], \"JOB_TITLE\": [\"<http:\/\/ls.com\/esg\/JOB_TITLE\/#general_manager>\"], \"ORG\": [\"<http:\/\/ls.com\/esg\/ORG\/#Shell>\"], \"GPE\": []}}"]}]'
//     },
//     {
//         'status': 'success',
//         'message': '',
//         'data': '[{"barr_doc_name":"BATR000020220624ei6n00009","barr_title":"Shell_giving_USD_27.5_million_to_LSU_for_new_energy_innovation_institute:_Heres_what_it_will_do.","gvr_doc_name":"","gvr_title":"","summary":"Lee Stockwell working with Shell as general manager.","ner_object":["{\"BATR000020220624ei6n00009\": {\"PERSON\": [\"<http:\/\/ls.com\/esg\/PERSON\/#Lee_Stockwell>\"], \"JOB_TITLE\": [\"<http:\/\/ls.com\/esg\/JOB_TITLE\/#general_manager>\"], \"ORG\": [\"<http:\/\/ls.com\/esg\/ORG\/#Shell>\"], \"GPE\": []}}"]}]'
//     }
// ]


// // function summary() {
// //     tablediv.innerHTML = ''
// //     for (let index = 0; index < jsonData.length; index++) {
// //         // console.log(index)
// //         let dat = jsonData[index].data.split(',')
// //         for (let i = 0; i < dat.length; i++) {
// //             if (dat[i].includes('summary')) {
// //                 // console.log(i)
// //                 let replaced = dat[i].replaceAll('"', ' ')
// //                 // console.log(replaced)
// //                 let finalsummmary = replaced.split(':')
// //                 // console.log(finalsummmary[1])

// //                 let div = document.createElement('div')
// //                 div.classList.add('summarytable')
// //                 let table = document.createElement('table')
// //                 table.classList.add('table')
// //                 table.setAttribute('id', 'sumtable')
// //                 let tr = document.createElement('tr')
// //                 let tr1 = document.createElement('tr')
// //                 tr.classList.add('table-dark')
// //                 let th1 = document.createElement('th')
// //                 let th2 = document.createElement('th')
// //                 // let td1 = document.createElement('td')
// //                 // let td2 = document.createElement('td')
// //                 let td3 = document.createElement('td')
// //                 let td4 = document.createElement('td')
// //                 let words = [{ 'manager': 'green' }, { 'Shell': 'red' }]
// //                 let coloredString = finalsummmary[1]
// //                 words.forEach(wordToColor => {
// //                     console.log(Object.values(wordToColor)[0])
// //                     if (Object.keys(wordToColor)[0].toLocaleLowerCase() == 'Shell'.toLocaleLowerCase()) {
// //                         coloredString = coloredString.replace(
// //                             new RegExp(`\\b${Object.keys(wordToColor)[0]}\\b`, 'g'),
// //                             `<span style="color:${Object.values(wordToColor)[0]};
// //                           background-color:rgb(230, 210, 210);
// //                           padding:0px
// //                           ">${Object.keys(wordToColor)[0]}</span>`
// //                         )
// //                     }
// //                     if (Object.keys(wordToColor)[0].toLocaleLowerCase() == 'manager'.toLocaleLowerCase()) {
// //                         console.log('hi')
// //                         coloredString = coloredString.replace(
// //                             new RegExp(`\\b${Object.keys(wordToColor)[0]}\\b`, 'g'),
// //                             `<span style="
// //                           color: ${Object.values(wordToColor)[0]};
// //                           background-color:rgb(230, 210, 210);
// //                           padding:0px">${Object.keys(wordToColor)[0]}</span>`
// //                         )
// //                     }
// //                 });
// //                 th1.innerHTML = ' '
// //                 th2.innerHTML = 'Summary'
// //                 td3.innerHTML = index + 1 + '.'
// //                 td4.innerHTML = ' ' + coloredString
// //                 tr.appendChild(th1)
// //                 tr.appendChild(th2)
// //                 tr1.appendChild(td3)
// //                 tr1.appendChild(td4)
// //                 table.appendChild(tr)
// //                 table.appendChild(tr1)
// //                 div.appendChild(table)
// //                 tablediv.appendChild(div)
// //             }
// //         }
// //         // jsonData.data.forEach(daat=>{
// //         //     console.log(daat)
// //         // })
// //         // console.log(dat[4])
// //         // Extract the summary from the first object in the array
// //         //   const summary = parsedJson[0].summary;

// //         //   console.log(summary);

// //     }
// // }

// const searchInput = document.getElementById('searchInput');
// function validateInput(input) {
//     const alphanumericRegex = /^[a-zA-Z0-9]*$/;
//     return alphanumericRegex.test(input);
// }
// function handleInput() {
//     const query = searchInput.value;
//     console.log(query)
//     if (!validateInput(query)) {
//         console.log('please enter a valid alpha search');
//         return;
//     }
//     else {
//         console.log('validated')
//     }
// }
// searchInput.addEventListener('keyup', handleInput);


// // let dt11 = document.getElementById("h1tag").innerHTML = `This \n\n</br> is my h1 tag`;
// // console.log(dt11)


// // function show() {
// //     let new_data = [
// //         {
// //             corpus_id: 45,
// //             user_id: 189,
// //             corpus_name: 'lsu',
// //             category: 'Cat-1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'lsu',
// //             db_name: 'lsu',
// //             index_type: 'docs',
// //             directory: 'ls-textdistil-20/ls_textdistil_11_189_2/lsu/user_files',
// //             display_corpus_name: 'lsu second',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 48,
// //             user_id: 189,
// //             corpus_name: 'sgbv',
// //             category: '',
// //             signal_name: '',
// //             corpus_type: 'SYSTEM',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'monash_all_files',
// //             db_name: 'monash_all_files',
// //             index_type: 'csv',
// //             directory: 'ls-textdistil-20/ls_textdistil_11_189_2/sgbv/user_files',
// //             display_corpus_name: 'sgbv first',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 49,
// //             user_id: 189,
// //             corpus_name: 'esg',
// //             category: 'cat_1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'SYSTEM',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'esg',
// //             db_name: 'esg',
// //             index_type: 'csv',
// //             directory: 'ls-textdistil-20/ls_textdistil_11_189_2/esg/user_files',
// //             display_corpus_name: 'esg',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: 'ontology_config_esg.json',
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'ACTIVE'
// //         },
// //         {
// //             corpus_id: 122,
// //             user_id: 189,
// //             corpus_name: 'test_icoprus',
// //             category: 'Cat-1',
// //             signal_name: 'Events',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'test_icoprus',
// //             db_name: 'test_icoprus',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/test_icoprus/user_files',
// //             display_corpus_name: 'test icoprus',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 123,
// //             user_id: 189,
// //             corpus_name: 'first_esg',
// //             category: 'Cat-1',
// //             signal_name: 'Org-Person',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'first_esg',
// //             db_name: 'first_esg',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/first_esg/user_files',
// //             display_corpus_name: 'first esg',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 124,
// //             user_id: 189,
// //             corpus_name: 'test_aditya',
// //             category: 'Cat-1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'test_aditya',
// //             db_name: 'test_aditya',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/test_aditya/user_files',
// //             display_corpus_name: 'test aditya',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 125,
// //             user_id: 189,
// //             corpus_name: 'test_two',
// //             category: 'Cat-1',
// //             signal_name: 'Events',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'test_two',
// //             db_name: 'test_two',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/test_two/user_files',
// //             display_corpus_name: 'test two',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: 'ontology_config_esg.json',
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'ACTIVE'
// //         },
// //         {
// //             corpus_id: 126,
// //             user_id: 189,
// //             corpus_name: 'testing_new',
// //             category: 'Cat-1',
// //             signal_name: 'Org-Person',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'testing_new',
// //             db_name: 'testing_new',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/testing_new/user_files',
// //             display_corpus_name: 'testing new',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 139,
// //             user_id: 189,
// //             corpus_name: 'prince',
// //             category: 'Cat-1',
// //             signal_name: 'Events',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'prince',
// //             db_name: 'prince',
// //             index_type: 'docs',
// //             directory: 'ls-textdistil-20/ls_textdistil_11_189_2/prince/user_files',
// //             display_corpus_name: 'prince',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 140,
// //             user_id: 189,
// //             corpus_name: 'tushar',
// //             category: 'Cat-1',
// //             signal_name: 'Org-Person',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'tushar',
// //             db_name: 'tushar',
// //             index_type: 'docs',
// //             directory: 'ls-textdistil-20/ls_textdistil_11_189_2/tushar/user_files',
// //             display_corpus_name: 'tushar',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 141,
// //             user_id: 189,
// //             corpus_name: 'pream',
// //             category: 'Cat-1',
// //             signal_name: 'Org-Person',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 202,
// //             index_name: 'pream',
// //             db_name: 'pream',
// //             index_type: 'docs',
// //             directory: 'ls-textdistil-20/ls_textdistil_11_189_2/pream/user_files',
// //             display_corpus_name: 'pream',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 142,
// //             user_id: 189,
// //             corpus_name: 'teeka',
// //             category: 'Cat-1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'teeka',
// //             db_name: 'teeka',
// //             index_type: 'docs',
// //             directory: 'ls-textdistil-20/ls_textdistil_11_189_2/teeka/user_files',
// //             display_corpus_name: 'teeka',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: 'ontology_config_esg.json',
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'ACTIVE'
// //         },
// //         {
// //             corpus_id: 143,
// //             user_id: 189,
// //             corpus_name: 'testing_eleven',
// //             category: 'Cat-1',
// //             signal_name: 'Org-Person',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'testing_eleven',
// //             db_name: 'testing_eleven',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/testing_eleven/user_files',
// //             display_corpus_name: 'testing eleven',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: 'hd_doc2ie_config_esg.json',
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 145,
// //             user_id: 189,
// //             corpus_name: 'test_six',
// //             category: 'Cat-1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'test_six',
// //             db_name: 'test_six',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/test_six/user_files',
// //             display_corpus_name: 'test six',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: null,
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 146,
// //             user_id: 189,
// //             corpus_name: 'esg_try',
// //             category: 'Cat-1',
// //             signal_name: 'Org-Person',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 202,
// //             index_name: 'esg_try',
// //             db_name: 'esg_try',
// //             index_type: 'docs',
// //             directory: 'ls-textdistil-20/ls_textdistil_11_189_2/esg_try/user_files',
// //             display_corpus_name: 'esg try',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: null,
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 147,
// //             user_id: 189,
// //             corpus_name: 'lsu_teaser',
// //             category: 'Cat-1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'lsu_teaser',
// //             db_name: 'lsu_teaser',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/lsu_teaser/user_files',
// //             display_corpus_name: 'lsu teaser',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: null,
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 149,
// //             user_id: 189,
// //             corpus_name: 'adil_testing',
// //             category: 'Cat-1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'adil_testing',
// //             db_name: 'adil_testing',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/adil_testing/user_files',
// //             display_corpus_name: 'adil testing',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: null,
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 150,
// //             user_id: 189,
// //             corpus_name: 'test_adi',
// //             category: 'Cat-1',
// //             signal_name: 'Org-Person',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'test_adi_189',
// //             db_name: 'test_adi',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/test_adi/user_files',
// //             display_corpus_name: 'test adi',
// //             doc_content_type: 2,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: null,
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 151,
// //             user_id: 189,
// //             corpus_name: 'adil_testing_one',
// //             category: 'Cat-1',
// //             signal_name: 'Org-Person',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'adil_testing_one_189',
// //             db_name: 'adil_testing_one',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/adil_testing_one/user_files',
// //             display_corpus_name: 'adil testing one',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: null,
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         },
// //         {
// //             corpus_id: 152,
// //             user_id: 189,
// //             corpus_name: 'festiv_six',
// //             category: 'Cat-1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'festiv_six_189',
// //             db_name: 'festiv_six_189',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/festiv_six/user_files',
// //             display_corpus_name: 'festiv six',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: null,
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'ACTIVE'
// //         },
// //         {
// //             corpus_id: 153,
// //             user_id: 189,
// //             corpus_name: 'festive_six',
// //             category: 'Cat-1',
// //             signal_name: 'Esg-Signal-1',
// //             corpus_type: 'PRIVATE',
// //             batch_under_process: 'no',
// //             created_date: 2023,
// //             index_name: 'festive_six_189',
// //             db_name: 'festive_six_189',
// //             index_type: 'docs',
// //             directory:
// //                 'ls-textdistil-20/ls_textdistil_11_189_2/festive_six/user_files',
// //             display_corpus_name: 'festive six',
// //             doc_content_type: 1,
// //             write_outputs_to_user_folder: 'NO',
// //             doc2ie_config_name: null,
// //             onto_config_name: null,
// //             general_ner_map_file_name: 'general_ner_mapping_file.csv',
// //             corpus_ner_map_file_name: 'esg_ner_mapping_file.csv',
// //             corpus_status: 'INACTIVE'
// //         }]


// //     let name = 'adil_testing'
// //     // let ststyus='INACTIVE'
// //     let fil = new_data.map((data, ind) => {
// //         if (data.corpus_name == name && data.corpus_status.toLocaleLowerCase() == 'INACTIVE'.toLocaleLowerCase()) {
// //             console.log('id=', ind)
// //             console.log('status=', data.corpus_status)
// //             console.log(data.corpus_name, name)
// //             return data + ind
// //         } else {
// //             if (data.corpus_name == name) {
// //                 console.log('id=', ind)
// //                 console.log('status=', data.corpus_status)
// //                 console.log(data.corpus_name, name)
// //             }
// //         }
// //     })
// //     console.log((fil.length > 0) ? fil[0]['corpus_name'] : false)
// //     // console.log(fil[0]['corpus_name'])
// // }


// // /* scrolling divs firstdiv seconddiv*/

// let td1 = document.getElementById('div1')
// let td11 = document.getElementById('div11')
// let td12 = document.getElementById('div12')
// let td2 = document.getElementById('div2')


// let content1=document.getElementById('content1')
// function migrate(e) {
//     const parentDiv = document.getElementById('div11');
//     const childElements = parentDiv.getElementsByClassName('back');
//     for (let i = 0; i < childElements.length; i++) {
//         childElements[i].classList.remove('back');
//     }
      
//     let id = e.id;
//     let h1id = id.replace('b', 'h')
//     let h1tag = document.getElementById(h1id)
//     // h1tag.innerHTML=data
//     content1.innerHTML=h1tag.innerHTML
//     // console.log('959',h1tag.innerHTML)
//     h1tag.classList.add('back')
//     e.addEventListener('click', function () {
//         const rect = h1tag.getBoundingClientRect()
//         // console.log(h20)
//         // console.log(rect.top)
//         window.scrollTo(0, findPosition(content1))
//         // window.scrollTo({top:0,
//         //     bottom:findPosition(content1),
//         // behavior:"smooth"
//         // })
//         div11.scrollTo(0,
//             findPosition(h1tag)
//         );
//         findPosition(h1tag)
//         function findPosition(obj) {
//             var currenttop = 0;
//             console.log('obj-id=',obj.id)
//             // console.log('infunct', obj.offsetParent)
//             if (obj.offsetParent) {
//                 do {
//                     if (obj.id == h1id) {
//                         currenttop = obj.offsetTop - (document.getElementById("div1")).offsetTop
//                         console.log('parent', obj.offsetParent)
//                     } else {
//                         currenttop += obj.offsetTop;
//                         // console.log('obj offset=', obj.offsetTop)
//                         // console.log('crnt=', currenttop)
//                     }
//                 } while ((obj = obj.offsetParent));
//                 console.log(currenttop)
//                 return [currenttop];
//             }
//         }
//         console.log('height=', h1tag.offsetHeight)
//     })
// }
// function h1tags(){
//     let data
//     for (let index = 0; index < jsonData.length; index++) {
//         let dat = jsonData[index].data.split(',')
//         for (let i = 0; i < dat.length; i++) {
//             if (dat[i].includes('summary')) {
//                 let replaced = dat[i].replaceAll('"', ' ')
//                 let finalsummmary = replaced.split(':')
//                 let coloredString = finalsummmary[1]
//                 let words = [{ 'manager': 'black' }, { 'Shell': 'black' }]
//                 words.forEach(wordToColor => {
                    
//                     if (Object.keys(wordToColor)[0].toLocaleLowerCase() == 'Shell'.toLocaleLowerCase()) {
//                         coloredString = coloredString.replace(
//                             new RegExp(`\\b${Object.keys(wordToColor)[0]}\\b`, 'g'),
//                             `<span style="color:${Object.values(wordToColor)[0]};
//                           padding:0px
//                           ">${Object.keys(wordToColor)[0]}</span>`
//                         )
//                     }
//                     if (Object.keys(wordToColor)[0].toLocaleLowerCase() == 'manager'.toLocaleLowerCase()) {
//                         coloredString = coloredString.replace(
//                             new RegExp(`\\b${Object.keys(wordToColor)[0]}\\b`, 'g'),
//                             `<span style="
//                           color: ${Object.values(wordToColor)[0]};
//                           padding:0px">${Object.keys(wordToColor)[0]}</span>`
//                         )
//                     }
//                 });
//                 data=coloredString
//                 console.log(data)
//             }
//         }
//     }
//     for(i=1;i<=20;i++){
//         let tag = 'h'+i
//         // console.log(tag)
//         let tagname=document.getElementById(tag);
//         // console.log(tagname)
//         tagname.innerHTML=data
//     }
// }
// h1tags()

// // search implementation
// function searchWeb() {
//     const query = document.getElementById('query');
//     const resultsDiv = document.getElementById('results');
//     console.log(query.value.length)
//     // Clear previous results
//     resultsDiv.innerHTML = '';
//     // Split the query into lines (e.g., 50 characters per line)
//     const maxLineLength = 50;
//     const lines = [];
//     for (let i = 0; i < query.length; i += maxLineLength) {
//         lines.push(query.slice(i, i + maxLineLength));
//     }
    
//     // Create a list of search results for each line
//     lines.forEach((line, index) => {
//         const searchResult = document.createElement('p');
//         searchResult.textContent = `Search result ${index + 1}: ${line}`;
//         resultsDiv.appendChild(searchResult);
//     });
// }


const btn = document.getElementById('textbtn');
const qry=document.getElementById('qry')
qry.addEventListener('focus',()=>{
    btn.style.color='black'
    btn.style.backgroundColor='red'
})
qry.addEventListener("blur", function() {
    btn.style.color = 'black';
    btn.style.backgroundColor=''
});

qry.addEventListener("keydown",(event)=>{
    // btn.style.color='red'
    console.log(qry.value.length )
    console.log(event.keyCode)
    // console.log(alpha)
    let alpha=event.keyCode>64&&event.keyCode<91||event.keyCode==191
    if(qry.value.length>=200&&event.key!='Enter'&&alpha){
        alert('max value is 200')
    }
    if(event.key==='Enter'){
        event.preventDefault();
        console.log('enter key')
    }
})
// qry.addEventListener('keypress',(event)=>{
    //     console.log(event)
    //     console.log(qry.value)
    // })\

const query = document.getElementById('query');
const qbtn = document.getElementById('textbtn');
function message(){
    Swal.fire({
        title: 'Do you want to save the changes?',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        allowEscapeKey: false, 
    }).then((result) => {
        if (result.isConfirmed) {
        query.disabled=false;
        query.focus()
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}
// qbtn.style.marginTop='0px'
let sh=query.scrollHeight
let intitial=query.scrollHeight
query.textContent=''
let count=1
function incre(event){
    if(query.disabled){
        return
    }
    // console.log(event)
    if(query.value.length>=199){
        event.preventDefault();
        // console.log(event)
        query.disabled=true;
        let value=query.value
        query.value=value.substring(0, 199);
        message()
    }
    event.preventDefault();
    if(intitial<query.scrollHeight){
        qbtn.style.marginTop=`0px`
    }
    // console.log('length=',query.value.length)
    // console.log('ofst height=',query.offsetHeight)
    // console.log('query sh=',query.scrollHeight)
    if(query.scrollHeight<=query.offsetHeight){
        query.style.height=`auto`
        qbtn.style.marginTop=` 0px`
    }
    if(query.scrollHeight>=query.offsetHeight){
        console.log('if')
        query.style.height=`${query.scrollHeight}px`
        qbtn.style.marginTop=`${query.scrollHeight/5}px`
        
    }
    else{   
        let degrow=Math.ceil(query.scrollHeight/count)
        query.style.height=`${query.scrollHeight+2-degrow}px`
        }
}
// const query1 = document.getElementById('query1');

// query1.addEventListener('input', function () {
//     console.log('object',query1.scrollHeight)
//   this.style.height = 'auto';
//   this.style.height = (this.scrollHeight) + 'px';
// });

// // Optionally, set the initial height based on the content
// query1.style.height = (query1.scrollHeight) + 'px';




// function dis(){   
//     let maindiv=document.getElementById('results')
//     let data={
//         'HSBC os associated with Shell and tracking emissions': ['{"INDOP00020210606eh6600694": {"ORG": ["http://ls.com/esg/ORG/#Shell"], "ASSOC_ORG": ["http://ls.com/esg/ORG/#HSBC"], "GREEN_VARIABLE": ["http://ls.com/esg/GREEN_VARIABLE/#emissions"]}}'],
//         'HSBC as associated with Shell and tracking emissions': ['{"INDOP00020210606eh6600694": {"ORG": ["http://ls.com/esg/ORG/#Shell"], "ASSOC_ORG": ["http://ls.com/esg/ORG/#HSBC"], "GREEN_VARIABLE": ["http://ls.com/esg/GREEN_VARIABLE/#emissions"]}}'],  
//         'HSBC ss associated with Shell and tracking emissions': ['{"INDOP00020210606eh6600694": {"ORG": ["http://ls.com/esg/ORG/#Shell"], "ASSOC_ORG": ["http://ls.com/esg/ORG/#HSBC"], "GREEN_VARIABLE": ["http://ls.com/esg/GREEN_VARIABLE/#emissions"]}}']  
//     }
//     let arrdata=Object.entries(data)
//     // console.log(arrdata)
//     arrdata.forEach((data,id)=>{
//         let div=document.createElement('div')
//         let key=data[0]
//         console.log('key = ',key)
//         let value=data[1][0]
//         let parsed=JSON.parse(value)
//         let obj_key=Object.entries(parsed)
//         // console.log(obj_key)
//         obj_key.forEach(data=>{
//             let head=document.createElement('h1').innerHTML=data[0]
//             let keys=Object.entries(data[1])
//             console.log('obj key = ',data[0])
//             keys.forEach((key)=>{
//                 // let keys=document.createElement('h6').innerHTML='bjuj'
//                 // let values=document.createElement('h6').innerHTML='hhvb'
//                 console.log(key[0],' = ',key[1][0])
//                 // div.appendChild(keys)
//                 // div.appendChild(values)
//             })
//             div.appendChild(head)
//             // console.log(data[0])
//         })
//         div.appendChild(maindiv)
//         // console.log('data = ',typeof value,value)
//         // console.log('parsed data = ',typeof parsed,parsed)
//     })
//     // console.log(Object.entries(data).length);
//     // for(i=0;i<Object.entries(data).length;i++){
//     //     console.log(Object.keys(data)[i],'=',Object.values(data)[i])
//     // }
//     // data.forEach(element => {
//     //     console.log(element)
//     // });
// }





// function searchQueryByUser(corpus_name,corpus_id){
// 	var corpusName = corpus_name;
// 	var words_limit = 200;
// 		var openTextSearch = document.getElementById('corpusSearchBox');
// 		var alphanumericRegex =/^[a-zA-Z0-9\s.?]+$/;		
// 		openTextSearch.addEventListener("keypress",function(event){
// 			openTextSearch.keyPress = null
// 				var qry = openTextSearch.value;
// 			if(event.key === 'Enter'){
// 				event.preventDefault();
// 					if(qry == ""){
// 						showMessage("Please enter your question","");
// 						return false
// 					}else if(qry != "" && qry == " "){
// 						showMessage("qry can not be blank","");
// 						return false
// 					}else if(qry.length >=words_limit){
// 						 showMessage("Query Limit 200 character Only","")
// 			  		return false
// 					}else if(!alphanumericRegex.test(qry)){
// 						showMessage("Special character are not allowed","");
// 						return false
// 					}
// 					let message = [{message: "Loading...", timing:0, color:"black"}]
// 					document.getElementById("loader").style.display ="block";
// 					startLoader(message)
					
// 					if(document.getElementById("FactCheck1").style.display == "block"){
// 						document.getElementById("FactCheck1").style.display = "none";
// 					}	
// 					searchTextApi(corpus_name,qry,corpus_id);
// 			}
	
	
// 	})
		
// }

// let count=0
// function searchTextApi(qry){
// console.log('searched results..',++count)
//}


// function searchQueryByUser(){
// 	var words_limit = 200;
// 		var openTextSearch = document.getElementById('qry');
// 		var alphanumericRegex =/^[a-zA-Z0-9\s.?]+$/;		
// 		openTextSearch.addEventListener("keypress",function(event){
// 			openTextSearch.keyPress = null
// 				var user_query = openTextSearch.value;
// 			if(event.key === 'Enter'){
// 				event.preventDefault();
// 					if(user_query == ""){
// 						showMessage("Please enter your question","");
// 						return false
// 					}else if(user_query != "" && user_query == " "){
// 						showMessage("User_query can not be blank","");
// 						return false
// 					}else if(user_query.length >=words_limit){
// 						 showMessage("Query Limit 200 character Only","")
// 			  		return false
// 					}else if(!alphanumericRegex.test(user_query)){
// 						showMessage("Special character are not allowed","");
// 						return false
// 					}
// 					let message = [{message: "Loading...", timing:0, color:"black"}]
// 					document.getElementById("loader").style.display ="block";
// 					startLoader(message)
					
// 					if(document.getElementById("FactCheck1").style.display == "block"){
// 						document.getElementById("FactCheck1").style.display = "none";
// 					}	
// 					searchTextApi(corpus_name,user_query,corpus_id);
// 			}
	
	
// 	})
		
// }

// function searchTextApi(corpus_name,user_query,corpus_id){
// 	var corpusName = corpus_name
// 	var url ="/openTextSearch?corpusName="+corpusName+"&user_query="+user_query+"&corpus_id="+corpus_id
// 						sendJQueryAjaxAsyncReq(url).then(async(resp)=>{
// 								if(resp.redirected){
// 					        		window.location.assign(resp.url)
// 					        		return
// 					        	}else{       		
												
// 					        		document.getElementById("loader").style.display ="none"					        		
// 					        		var respResult =await JSON.parse(resp);
// 					        		if(typeof respResult["output"] == "string"){					        			
// 					        			respResult["output"] = JSON.parse(respResult["output"]);
// 					        		}
// 					        		if(respResult.status == "success"){
// 					        			console.log("line 1923......")
// 					        			var summarySpan = document.getElementById('summary');
// 												removeAllChildNodes(summarySpan);
// 					        			var result = {"result":respResult["output"]}					        			
// 					        		 document.getElementById("loader").style.display ="none";
					        			
// 												constructSummaryBlocksPanel(result,corpus_name)
// 					        		}else if(respResult.status == "error"){
// 					        			showMessage(respResult.message,"")
// 					        			document.getElementById("loader").style.display ="none";
// 					        		}
// 					        	}
// 						})
// }



