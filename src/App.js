import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInComponent from './Components/SignInComponent';
import SignUpComponent from './Components/SignUpComponent';
import GetProductsComponent from './Components/GetProductComponent';
import AddProduct from './Components/AddProductComponent';
import MakePayment from './Components/MakePayment'
import "bootstrap/dist/css/bootstrap.min.css"
import"bootstrap/dist/js/bootstrap.min.js"
import Navbar from './Components/Navbar';
function App() {
  return (
  <BrowserRouter>
  <div className="container-fluid">
   <div className="App">
   
      <header className="App-header">
       <h1>Bundi Phones</h1>
      </header>

      <Routes>
        <Route path='/signin' element={<SignInComponent/>} />
        <Route path='/signup' element={<SignUpComponent/>} />
        <Route path='/' element={<GetProductsComponent/>} />
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/makepayment' element={<MakePayment/>} />
      </Routes>
    </div>
    </div>
  
  </BrowserRouter>
  );
}

export default App;
