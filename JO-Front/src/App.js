import './App.css';
import Home from './Pages/Home';
import Filter from './Pages/FilterPage';
import ResultPage from './Pages/ResultPage';
import { BrowserRouter as Router , Routes , Route} from "react-router-dom";

function App() {
 return (
    <Router>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/Filter' element={ <Filter></Filter>} ></Route>
                <Route path='/Results' element={ <ResultPage></ResultPage>}></Route>
            </Routes>
    </Router>
     )
}

export default App;
