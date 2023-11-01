let data={
    0:'person1',
    1:'person2',
    2:'person3',
    3:'person4',
    4:'person5',
}
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("search");
    const list = document.getElementById("list");
    const results = document.getElementById("results");
    let div=document.createElement('div')
    div.setAttribute('class','listdiv')
    document.getElementById("maindiv").appendChild(div)
    let ul=document.createElement('ul')
    Object.values(data).forEach(lis=>{
        let li=document.createElement('li')
        li.setAttribute('class','list-items')
        li.innerHTML=lis
        ul.appendChild(li);
    })
    // ul.innerHTML=li
    div.appendChild(ul)
    searchInput.addEventListener("input", function() {
        if(searchInput.value){
            ul.innerHTML=''
            Object.values(data).filter(lis=>{
                console.log(lis,searchInput.value)
                console.log(lis.includes(searchInput.value))
                if(lis.includes(searchInput.value)){
                    let li=document.createElement('li')
                    li.setAttribute('class','list-items')
                    li.innerHTML=lis
                    ul.appendChild(li);
                }
            }) 
            div.appendChild(ul)
        }else{
            Object.values(data).filter(lis=>{
                    let li=document.createElement('li')
                    li.setAttribute('class','list-items')
                    li.innerHTML=lis
                    ul.appendChild(li);
            }) 
            console.log('no data')
        }
        const query = searchInput.value.toLowerCase();
        const items = list.getElementsByTagName("li");
        
        if (query === "") {
            results.style.display = "none";
            return;
        }

        const filteredItems = Array.from(items).filter(function(item) {
            return item.textContent.toLowerCase().includes(query);
        });
        console.log(filteredItems)
        if (filteredItems.length > 0) {
            results.style.display = "block";
            list.style.display = "none";
            results.innerHTML = "";
            filteredItems.forEach(function(item) {
                results.appendChild(item.cloneNode(true));
            });
        } else {
            results.style.display = "block";
            list.style.display = "none";
            results.innerHTML = "<p>No results found.</p>";
        }
    });
    
});
