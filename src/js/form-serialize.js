//引入的一个将表单转换成json对象的函数,稍作改动
function serializeForm1(form){ 
    var setForm = ""; 
    for(var key in form){ 
     if(form.hasOwnProperty(key) && (form[key].name=="account" || form[key].name=="password" || form[key].name=="email")){                         //可能定义别的时需要改动，其实可以改成==
      setForm += '"'+form[key].name+'"'+':'+'"'+form[key].value + '"'+',';
     }
    }
    setForm = "{" + setForm.slice(0,setForm.length-1) + "}";
    console.log(setForm);
    // console.log(JSON.parse(setForm));
    return JSON.parse(setForm);
   }