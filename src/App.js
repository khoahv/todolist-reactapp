import React, { Component } from 'react';
import './App.css';
import TaskForm from './component/TaskForm'
import Control from './component/Control'
import TaskList from './component/TaskList';
class App extends Component {
    constructor(props){
        super(props)
        this.state={
            tasks: [],
            isDisplayForm: false,
            filter: {
                name: '',
                status: -1
            },
            keyword: ''
        }
        
    }
    componentWillMount(){
     var tasks  = JSON.parse(localStorage.getItem('task'));
     console.log(tasks);
     this.setState({
         tasks: tasks
     })
        
    }

s4(){
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
}
genrateID(){
    return this.s4() + this.s4() + '-' +this.s4() +'-'+this.s4()+ '- '+this.s4();
}
openForm = () =>{
    this.setState({
        isDisplayForm: true
    })
}
closeForm = (params) => {
    this.setState({
        isDisplayForm: params
    })
}
onSubmit =(data) =>{
    var {tasks} = this.state;
    if(data.id===""){
        data.id = this.genrateID();
        tasks.push(data);
    }
   else{
    for( var i=0;i<this.state.tasks.length;i++){
        if(this.state.tasks[i].id===data.id){        
         this.state.tasks[i] = data;
        }
    }
   }
   this.setState({
       tasks: tasks
   })
   localStorage.setItem('task', JSON.stringify(tasks))
    
   
}
onUpdateStatus = (id) =>{
  for( var i=0;i<this.state.tasks.length;i++){
      if(this.state.tasks[i].id===id){
        //   console.log(this.state.tasks[i].status);      
         this.state.tasks[i].status = !this.state.tasks[i].status
        //  console.log(this.state.tasks[i].status);   
      }
  }
  var tasks = this.state.tasks;
  this.setState({
      tasks: tasks
  })
  localStorage.setItem('task', JSON.stringify(tasks))
    
}
onDelete = (id) =>{
    for( var i=0;i<this.state.tasks.length;i++){
        if(this.state.tasks[i].id===id){        
          this.state.tasks.splice(i,1)
        }
    }
    var tasks = this.state.tasks;
    this.setState({
        tasks: tasks
    })
    localStorage.setItem('task', JSON.stringify(tasks))

}
onUppdate = (id) =>{
    console.log(id);
    this.openForm();
    
    for( var i=0;i<this.state.tasks.length;i++){
        if(this.state.tasks[i].id===id){        
              this.taskEditing = this.state.tasks[i]
        }
    }
    this.setState({
        taskEditing: this.taskEditing
    })
    
    // var tasks = this.state.tasks;
    // this.setState({
    //     tasks: tasks
    // })
}
onFilter = (filterName, filterStatus) =>{
    console.log(filterName);
    console.log( typeof(filterStatus));
    filterStatus = parseInt(filterStatus,10);
    this.setState({
        filter: {
            name: filterName.toLowerCase(),
            status: filterStatus
        }
    })
    
    
}
onSearch = (keyword) =>{
    this.setState({
        keyword: keyword
    })
}
  render() {
    var {tasks, isDisplayForm, filter} = this.state; // var tasks = this.state.tasks
    var {keyword} = this.state
    console.log(filter);
    if(filter){
        if(filter.name){
           tasks= tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filter.name) !==-1
            })
        }
        
            tasks = tasks.filter((task) =>{
                if(filter.status ===-1){
                    return task;
                
                }else{
                    return task.status === (filter.status===1 ? true : false)
                }
            })
           
      
    }
   
   if(keyword){
    tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !==-1
    })
   }
    var elmentTaskForm = isDisplayForm ? <TaskForm reviceEvent={this.closeForm} onSubmit={this.onSubmit} 
    task = {this.taskEditing}/> : ""
    return (
      <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className = {isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4': ''} >
                    {elmentTaskForm}
                    </div>
                    <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8': 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary"  onClick={this.openForm}>
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>
                        <Control onSearch={this.onSearch} />
                        <TaskList tasks={tasks} 
                        onUpdateStatus={this.onUpdateStatus} 
                        onUppdate = {this.onUppdate}
                        onDelete={this.onDelete}  
                        onFilter = {this.onFilter}
                    />
                    </div>
                </div>
            </div>
    );
  }
}

export default App;
