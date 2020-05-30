import { TodoService } from './../service/todo.service';
import { Component, OnInit,} from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  color:Array<any>= ['#ffd31d','#42240c','#6a097d','#9a1f40','#007892','#63b7af','#abf0e9','#c81912','#f64b3c','#fdba9a','#45046a','#5c2a9d','#b5076b','#f1ebbb','#5fdde5']
  todos: Array<object>;
  todoTitle: string ;
  dataStatus: string ='Add';
  todoId: string;

  constructor(private todoservice:TodoService) { }

  ngOnInit(): void {

    this.todoservice.loadTodo().subscribe(val =>{
      //  console.log(val)
      this.todos=val
      
    })

   
  }

  addTodo(f:NgForm){
    if(this.dataStatus=='Add'){
   
      let randomNumber =Math.floor(Math.random() * this.color.length) ;
      let todoItem = {
        title: f.value.todoTitle,
        completed: false,
        colorCode:this.color[randomNumber],
      }
      this.todoservice.saveTodo(todoItem,this.todoId)
      f.resetForm();
    }else if(this.dataStatus=='Edit'){

     
    this.todoservice.updateTodo(this.todoId,f.value.todoTitle)
    this.dataStatus='Add'
     f.resetForm();
    
    }
   
  
  }
  onEdit(title:string,id:string){
this.todoTitle= title;
this.dataStatus= 'Edit';
this.todoId= id;
  }

  delete(id:string){
    this.todoservice.deleteTodo(id);
  }
 
 

}
