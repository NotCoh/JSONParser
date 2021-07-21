function getJSON(method){
    
    let requestURL = document.getElementById('get-input').value;
    let httpCheck = new RegExp('http://',''),
        httpsCheck = new RegExp('https://','')
    
        
    if (!(requestURL.match(httpCheck) || requestURL.match(httpsCheck))){
        let concatted = requestURL;
        requestURL=""
        requestURL = requestURL.concat('http://' , concatted)
        console.log(requestURL) 
    }
    this.method = method;
    function sendRequest(method , url) { 
        return new Promise((resolve,reject)=>{
            const xhr =new XMLHttpRequest()
            xhr.open(method,url)
            xhr.onload = () => {
                if (xhr.status >=400){
                    reject('server error ! ! !')
                }else{
                    document.getElementById('datas_container').innerHTML=""
                    resolve(xhr.response);
                }
            }
            xhr.onerror = () => {
                reject('server trouble')
            }
            xhr.send() 
        }) 
    }
    sendRequest('GET' , requestURL)
        .then((returedXHR)=>{
            let parsedResponse = JSON.parse(returedXHR)
            for (i in parsedResponse){
                let block = document.createElement('div');
                block.className="block"
                document.getElementById('datas_container').appendChild(block)
                recursive(parsedResponse[i] , block )
            }
        
    })
    .catch(()=>{let err = window.alert('check url accuracy') ; document.getElementById('get-input').value=""})
    function recursive(obj,parent){
        if (typeof obj === "object"){    
            for ( i in obj){
                recursive(obj[i] ,parent)
            }
        }
        else{
            let paragraph = document.createElement('p')
            paragraph.className = 'paragraph'
            paragraph.insertAdjacentHTML('beforeend',`<span class="field">${i} : </span><span class="value">${obj}</span>`)
            parent.appendChild(paragraph)
        }
    
    }

}
    









