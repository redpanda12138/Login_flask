//封装一些页面逻辑

//封装fetch,
async function http(obj){
    //解构赋值
    var {method, url, params, data} = obj
    //console.log(url)
    
    /*if(params){
       var str = new URLSearchParams(params).toString()   //拼接成 value=key 的形式
       url = url + '?' + str
       //console.log(url)
    };*/
    
       
    let res                     //统一作用域
    if(data || params)
    {
        res = await fetch(url,{
            method:method,
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)

        })
    }
    else{
         res = await fetch(url)
    };
    console.log(res)
    return res.json();
    
}


async function getData(body){                            //asysc和await成对出现
    /*fetch('http://localhost:3000/users')
        .then((response)=>response.json())
        .then((json)=>console.log(json));*/
    
    let res = await http({
        method:'get',
        url:'http://localhost:5000/product'
    })
    let htmlStr = ''
    console.log(res);
    var i=0
    res.forEach(element => {
       htmlStr += `
       <tr>
       <td>${i++}</td>
       <td>${element.id}</td>
       <td>${element.account}</td>
       <td>******</td>
       <td>${element.email}</td>
       </tr>
    `       
    });
    //console.log(htmlStr)
    body.innerHTML = htmlStr
}   


async function getData_d(body){                            //asysc和await成对出现
    /*fetch('http://localhost:3000/users')
        .then((response)=>response.json())
        .then((json)=>console.log(json));*/
    let res = await http({
        method:'get',
        url:'http://localhost:5000/product'
    });
    let htmlStr = ''
    var i=0
    console.log(res);
    await res.forEach(element => {
       htmlStr += `
       <tr>
       <td>${i++}</td>
       <td>${element.id}</td>
       <td>${element.account}</td>
       <td>******</td>
       <td>${element.email}</td>
       <td>
            <button type='button' class='btn btn-link btn-sm' data-id="${element.id}" data-num="${i}">删除</button>
       </td>
       </tr>
    `       
    });
    //console.log(htmlStr)
    body.innerHTML = htmlStr
    
}


async function getData_u(body){                            //asysc和await成对出现
    /*fetch('http://localhost:3000/users')
        .then((response)=>response.json())
        .then((json)=>console.log(json));*/
    let res = await http({
        method:'get',
        url:'http://localhost:5000/product'
    });
    let htmlStr = ''
    var i=0
    console.log(res);
    await res.forEach(element => {
       htmlStr += `
       <tr>
       <td>${i++}</td>
       <td>${element.id}</td>
       <td>${element.account}</td>
       <td>******</td>
       <td>${element.email}</td>
       <td>
            <button type='button' class='btn btn-link btn-sm' data-id="${element.id}" data-num="${i}">修改</button>
       </td>
       </tr>
    `       
    });
    //console.log(htmlStr)
    body.innerHTML = htmlStr
    
}

async function logIn(applier){                            //asysc和await成对出现
    /*fetch('http://localhost:3000/users')
        .then((response)=>response.json())
        .then((json)=>console.log(json));*/
    let res = await http({
        method:'get',
        url:'http://localhost:5000/product'
    });
    console.log(res)
    var el_flag = 0, re_flag = 0;
    await res.forEach(element => {
       if(applier.account === element.account){
            el_flag = 1
            if(applier.password === element.password){
                alert('登录成功');
                re_flag = 1;
            }
            else alert('密码错误');
       }
       
    });
    if(el_flag == 0){
        alert('不存在该账户');
    }
    if(re_flag == 1){
        return 1;
    }
   
    
}