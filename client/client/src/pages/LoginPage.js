import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import '../css/createProgect.css'
import Button from 'react-bootstrap/Button';
import { Component } from 'react';
class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
        }
        this.changeEmailHandler=this.changeEmailHandler.bind(this);
        this.changePasswordHandler=this.changePasswordHandler.bind(this);
    }
    changeEmailHandler=(event)=>{
        this.setState({email: event.target.value});
    }
    changePasswordHandler=(event)=>{
        this.setState({password: event.target.value});
    }
    async login(e){
        e.preventDefault();
        let fromData={
            email:this.state.email,
            password:this.state.password,
        }
        console.log(JSON.stringify(fromData));
    }
    render(){
        return(
            <>  
            <Container>
                <a class="close" href='#'><img src='img/crest.png' alt='asdas'/>&nbsp;&nbsp;Login</a>
                <Form className='col-8 py-4'>
                    <Form.Group className="mb-3 py-4" controlId="formGroupEmail">
                        <Form.Control size="lg" value={this.state.email} onChange={this.changeEmailHandler} className='createprocet' type="text" placeholder="Enter your email" />
                        <div class="line"></div>
                    </Form.Group>
                    <Form.Group className="mb-3 " controlId="formGroupPassword">
                        <Form.Control size="lg" value={this.state.password} onChange={this.changePasswordHandler} className='createprocet' type="text" placeholder="Enter your password" />
                        <div class="line"></div>
                    </Form.Group>
                    <Button variant="lite" className='nextbtn' type="submit">
                        <img className='nextImg' src='img/next.png'/>
                    </Button>
                </Form>
            <div className='right'>
                <a href='#'><img src='img/qession.png' className='qessionBtn'/></a>
            </div>
            </Container>
        </>
        )
    }
}
// function LoginPage(){

    // return(
    //     <>  
    //     <Container>
    //         <a class="close" href='#'><img src='img/crest.png' alt='asdas'/>&nbsp;&nbsp;Login</a>
    //         <Form className='col-8 py-4'>
    //             <Form.Group className="mb-3 py-4" controlId="formGroupEmail">
    //                 <Form.Control size="lg" className='createprocet' type="text" placeholder="Enter your email" />
    //                 <div class="line"></div>
    //             </Form.Group>
    //             <Form.Group className="mb-3 " controlId="formGroupPassword">
    //                 <Form.Control size="lg" className='createprocet' type="text" placeholder="Enter your password" />
    //                 <div class="line"></div>
    //             </Form.Group>
    //             <Button variant="lite" className='nextbtn' type="submit">
    //                 <img className='nextImg' src='img/next.png'/>
    //             </Button>
    //         </Form>
    //     <div className='right'>
    //         <a href='#'><img src='img/qession.png' className='qessionBtn'/></a>
    //     </div>
    //     </Container>
    // </>
    // )

// }

export default LoginPage