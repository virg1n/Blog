import Form from 'react-bootstrap/Form';
import '../css/createProgect.css'
import Button from 'react-bootstrap/Button';
function CreateProjectPage() {
    return(
    <>  
        <a class="close" href='#'><img src='img/crest.png' alt='asdas'/>&nbsp;&nbsp;Create Project</a>
        <Form className='col-8 py-4'>
            <Form.Group className="mb-3 py-4" controlId="formGroupEmail">
                <Form.Control size="lg" className='createprocet' type="text" placeholder="Enter your project name" />
                <div class="line"></div>
            </Form.Group>
            <Form.Group className="mb-3 " controlId="formGroupPassword">
                <Form.Control size="lg" as="textarea" rows={1} className='createprocet' type="text" placeholder="Description for project" />
                <div class="line"></div>
            </Form.Group>
            <div className='menu py-5'>
                <Form.Group className='frame' controlId="formFileLg">
                    <Form.Control type="file"/>
                </Form.Group>
                <div className='frame px-5'>You can add some docx and other documents</div>
            </div>
            <div key={'default-checkbox'} className="mb-3">
                <Form.Check 
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`You confirm with our Terms`}
                />
            </div>
            <Button variant="lite" className='nextbtn' type="submit">
                <img className='nextImg' src='img/next.png'/>
            </Button>
        </Form>
        <div className='right'>
            <a href='#'><img src='img/qession.png' className='qessionBtn'/></a>
        </div>
    </>
    )
}

export default CreateProjectPage;