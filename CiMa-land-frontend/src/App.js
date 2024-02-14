import HomePage from './Views/Homepage/Homepage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import ProtectedLayout from './Components/ProtectedLayout';
import AddPost from "./Views/AddPost/AddPost";
import Posts from "./Views/Posts/Posts";
import ViewPost from "./Views/ViewPost/ViewPost";
import Profile from "./Views/Profile/Profile";

function App() {
  return (
  <>
    <Router>
           <div className="App">
           <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route exact path="/posts" element={<Posts/>}/> 
            <Route path="/viewpost/:sid" element={<ViewPost/>} />
            <Route path="/dashboard" element={<ProtectedLayout/>}>
              <Route exact path="/dashboard/addpost" element={<AddPost/>}/> 
              <Route exact path="/dashboard/profile" element={<Profile/>}/> 
            </Route>
          </Routes>
           </div>
       </Router>
  </>
  );
}

export default App;

