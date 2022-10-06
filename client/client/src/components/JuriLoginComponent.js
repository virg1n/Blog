import React, { Component } from 'react'
import axios from 'axios';

class JuriLoginComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            firstName:'',
            lastName:'',
            emailId:'',
            phonenumber:''
        }
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changePatronymicHandler=this.changePatronymicHandler.bind(this);
        this.changeEmailIdHandler=this.changeEmailIdHandler.bind(this);
        this.changeIINHandler=this.changeIINHandler.bind(this);
        this.changePhonenumberHandler = this.changePhonenumberHandler.bind(this);
        this.saveStudent=this.saveStudent.bind(this);
    }
    changeFirstNameHandler=(event)=>{
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler=(event)=>{
        this.setState({lastName: event.target.value});
    }
    changePatronymicHandler=(event)=>{
        this.setState({patronymic: event.target.value});
    }
    changeEmailIdHandler=(event)=>{
        this.setState({emailId: event.target.value});
    }
    changeIINHandler=(event)=>{
        this.setState({IIN: event.target.value});
    }
    changePhonenumberHandler=(event)=>{
        this.setState({phonenumber: event.target.value});
    }
    saveStudent=(e)=>{
        e.preventDefault();
        let student={firstName: this.state.firstName,lastName: this.state.lastName,patronymic:this.state.patronymic,emailId: this.state.emailId, IIN: this.state.IIN,phonenumber:this.state.phonenumber};
        console.log('Student=>'+JSON.stringify(student));
        axios.post("http://127.0.0.1:3001/user/registration",JSON.stringify(student)).then(data=> console.log(data));
    }
    cancel(){
        this.props.history.push();
    }
    render(){
        return(
            <div>
            <div className="container">
                <div className="row">
                    <br></br>
                    <h1 className="text-center">Registration</h1>
                    <br></br>
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Имя:</label>
                                    <input placeholder="Кирил" name="firstName" className="form-control"
                                    value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Фамилмя:</label>
                                    <input placeholder="Соловьев" name="lastName" className="form-control"
                                    value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Очество:</label>
                                    <input placeholder="Петрович" name="patronymic" className="form-control"
                                    value={this.state.patronymic} onChange={this.changePatronymicHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input placeholder="myemail@cool.kz" name="emailId" className="form-control"
                                    value={this.state.emailId} onChange={this.changeEmailIdHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>ИИН:</label>
                                    <input placeholder="00000000000" name="IIN" className="form-control"
                                    value={this.state.IIN} onChange={this.changeIINHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Номер телефона:</label>
                                    <input placeholder="+7 700 000 0000" name="phonenumber" className="form-control"
                                    value={this.state.phonenumber} onChange={this.changePhonenumberHandler}/>
                                </div>
                                <br></br>
                                <br></br>
                                <button className="btn btn-success" onClick={this.saveStudent}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind} style={{marginLeft:"10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default JuriLoginComponent
