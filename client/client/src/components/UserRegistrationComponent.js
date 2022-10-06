import React, { Component } from 'react'
import axios from 'axios';
import userScema from '../Validation/UserValidation';

class StudentComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            fullname:'',
            IIN:'',
            email:'',
            phonenumber:'',
            password:'',
            repitpassword:''
        }
        this.changeFullNameHandler=this.changeFullNameHandler.bind(this);
        this.changeIINHandler=this.changeIINHandler.bind(this);
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changePhonenumberHandler=this.changePhonenumberHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
        this.changeRepitPasswordHandler=this.changeRepitPasswordHandler.bind(this);
        this.saveStudent=this.saveStudent.bind(this);
    }

    changeFullNameHandler=(event)=>{
        this.setState({fullname: event.target.value});
    }
    changeIINHandler=(event)=>{
        this.setState({IIN: event.target.value});
    }
    changeEmailHandler=(event)=>{
        this.setState({email: event.target.value});
    }
    changePhonenumberHandler=(event)=>{
        this.setState({phonenumber: event.target.value});
    }
    changePasswordHandler=(event)=>{
        this.setState({password: event.target.value});
    }
    changeRepitPasswordHandler=(event)=>{
        this.setState({repitpassword: event.target.value});
    }   
    async saveStudent(e){
        e.preventDefault();
        let fromData={
            fullname: this.state.fullname,
            IIN: this.state.IIN,
            email:this.state.email,
            phonenumber: this.state.phonenumber, 
            password: this.state.password,
            repitpassword: this.state.repitpassword};
        console.log(fromData);
        console.log('Student=>'+JSON.stringify(fromData));
        const isValid = await userScema.isValid(fromData);
        console.log(isValid);
        if(isValid && this.state.password===this.state.repitpassword) axios.post("http://127.0.0.1:3001/user/registration",JSON.stringify(fromData)).then(data=> console.log(data));
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
                                    <label>ФИО:</label>
                                    <input placeholder="Кирил Соловьев Петрович" name="fullname" className="form-control"
                                    value={this.state.fullname} onChange={this.changeFullNameHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>ИИН:</label>
                                    <input placeholder="12 чисел" name="lastName" className="form-control"
                                    value={this.state.IIN} onChange={this.changeIINHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input placeholder="myemail@cool.kz" name="patronymic" className="form-control"
                                    value={this.state.email} onChange={this.changeEmailHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Номер телефона:</label>
                                    <input placeholder="+7 700 000 0000" name="phonenumber" className="form-control"
                                    value={this.state.phonenumber} onChange={this.changePhonenumberHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>Пароль:</label>
                                    <input placeholder="" type={"password"} name="emailId" className="form-control"
                                    value={this.state.password} onChange={this.changePasswordHandler}/>
                                </div>
                                <div className="form-group">
                                    <label>повтор пароль:</label>
                                    <input placeholder="00000000000" type={"password"} name="IIN" className="form-control"
                                    value={this.state.repitpassword} onChange={this.changeRepitPasswordHandler}/>
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
export default StudentComponent
