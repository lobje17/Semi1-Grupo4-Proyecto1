import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';

const Dashboard = () => {

    return (
        <div className="dashboard" >
            <div className="maindiv" >
                <Container fluid className="row justify-content-center" >
                   <h1>Super Storage</h1>
                </Container>
                <div className="Login">
                <Login />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;