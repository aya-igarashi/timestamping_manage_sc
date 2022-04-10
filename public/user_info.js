document.getElementById("tosearch").onclick = function(){

    const search_day = document.getElementById("search_day").value;
    const tbody = document.getElementById('tbody'); 
  
    while(tbody.firstChild) tbody.removeChild(tbody.firstChild);    
  
    const url = '/find'; // 通信先
    const req = new XMLHttpRequest(); // 通信用オブジェクト
  
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(search_day));
    console.log(search_day);
        
    req.onreadystatechange = function(){
      if(req.readyState == 4 && req.status == 200) {
        console.log(req.response);
        const results = JSON.parse(req.response);
           
        for(let i in results) {
          const tr = document.createElement('tr');
          const td_type = document.createElement('td');
          td_type.innerHTML = results[i].theme;
          const td_time = document.createElement('td');
          td_time.innerHTML = results[i].question; 
          const jbBtn = document.createElement( 'button' );
          const jbBtnText = document.createTextNode( '削除' );
          jbBtn.appendChild( jbBtnText );
          jbBtn.name = 'delete_btn';
          jbBtn.value = results[i]._id;
          jbBtn.setAttribute('onclick', 'remove("' + results[i]._id + '")');
        
          tr.appendChild(td_type);
          tr.appendChild(td_time);
          tr.appendChild(jbBtn);
          tbody.appendChild(tr);
        }
        
      }
    }
};