Vue.component('navbar',
{
template:`
<div>
<div class="nav">
        <p style="display: block">ToDo's</p>
</div>
</div>
`
});





var app = new Vue(
{
 el:'#myTodoApp',
 data:{
     todoTask:'',
     


    },
 methods:{
    

     onSubmit: function()
     {  
        
        myTodos = [];
        var date = new Date();
        var mydate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
        
       
        
            
           
            if(localStorage.getItem('todo')==null)
            {
            myTodos.push({date:mydate,text:this.todoTask});
            
            window.localStorage.setItem('todo',JSON.stringify(myTodos));
            }
            else{
             myTodos = JSON.parse(localStorage.getItem('todo'));
             myTodos.push({date:mydate,text:this.todoTask});
            
            window.localStorage.setItem('todo',JSON.stringify(myTodos));
            }


            document.location.reload();
             
        


         


     },
     localStorageHasItem:function()
     {
        if(window.localStorage.getItem('todo'))
        {
            return true;
        }
        else{
            return false;
        }
     },
     updateTaskToUI: function()
    {
        var tableBody = document.getElementById('tableBody');
       
        

        let sno = 0;
        let storedTodo = JSON.parse(window.localStorage.getItem('todo'));
        console.log('Stored Todo: '+storedTodo);
        for(let todo of storedTodo)
        {   var row = document.createElement('tr');
             sno++;
            row.innerHTML = `
            <td>${todo.date}</td>
            <td>${todo.text}</td>
            <td><button onClick="app.remove(this)" id="dlt" class="btn btn-danger btn-sm delete">X</button></td>
            ` ;
            tableBody.appendChild(row);
            console.log("Loop: "+sno);
            console.log("Todo: "+todo.text);
            
           
        }
       
       this.todoTask = '';
    },
   remove:function(el)
   {
        
      var mystr = el.parentElement.parentElement.innerHTML.split('<td>');
      var t = mystr[2].split('</td>');
      var taskDLT = t[0];
      console.log(taskDLT);
      var storedData = JSON.parse(window.localStorage.getItem('todo'));
      storedData.forEach((data,index)=>{
        if(data.text==taskDLT)
        {
            storedData.splice(index,1);
        }
      });

      window.localStorage.setItem('todo',JSON.stringify(storedData));
      window.location.reload();
   },
   clearAll:function()
   {
       window.localStorage.removeItem('todo');
       window.location.reload();
   }
     
 }
});

window.addEventListener('load',()=>{
    app.updateTaskToUI();
});
