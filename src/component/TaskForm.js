import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    componentWillMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,

            })
        }
        console.log(this.state);
        
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name==="status"){
            value = value.target === 'true' ? true : false
        }
        this.setState({
            [name]:value
        })
    }
    clickCloseForm = () =>{
        this.props.reviceEvent(false);
    }
    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state)
        this.onVeBanDau();
        
    }
    onVeBanDau = () =>{
        this.setState({
            name : '',
            status: true
        })
    }
  render() {
    var {id} = this.state
    return (
      
        <div className="panel panel-warning">
        <div className="panel-heading">
            <h3 className="panel-title">
                { id==='' ?   'Thêm Công Việc': 'Sửa công việc' }
                <span
                    className="fa fa-times-circle text-right"   
                ></span>
            </h3>
        </div>
        <div className="panel-body">
            <form onSubmit= {this.onSubmit}>
                <div className="form-group">
                    <label>Tên :</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={ this.onChange }
                    />
                </div>
                <label>Trạng Thái :</label>
                <select
                    className="form-control"
                    value={this.state.status}
                    onChange={this.onChange}
                    name="status"
                >
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                </select><br/>
                <div className="text-center">
                    <button type="submit" className="btn btn-warning">
                        <span className="fa fa-plus mr-5"></span>Lưu Lại
                    </button>&nbsp;
                   
                    <button type="button"  className="btn btn-danger" onClick={()=> this.clickCloseForm()}>
                        <span className="fa fa-close mr-5" ></span>Hủy Bỏ
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
  }
}

export default TaskForm;
