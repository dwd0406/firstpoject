import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Signin from "./pages/Signin";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import MyPosts from "./pages/MyPosts";
import MyCollections from "./pages/MyCollections";
import React from "react";
import { auth } from "./utils/firebase";
function App() {
    const [user, setUser] = React.useState();
    React.useEffect(() => {
        auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (<BrowserRouter  > 
        <Header user={user}/>
        <Routes>
            <Route path='/posts' element={<Posts />} ></Route>
            <Route path='/signin' element={user !== null ? <Route element={<Posts />} /> : <Signin />} ></Route>
            {user !== null ? (<>
                <Route path='/my' element={<MyPosts />} />
                <Route path='/my/posts' element={<MyPosts />} />
                <Route path='/my/collections' element={<MyCollections />} />
            </>) : (<>
                <Route element={<Posts />} />
            </>)
            }
            <Route path="/new-post" element={user !== null ? <NewPost /> : <Route element={<Posts />} />}>
            </Route>
            <Route path="/posts/:postId" element={user !== null ? <Post /> : <Posts/>}>
            </Route>
        </Routes>
    </BrowserRouter>)
}

export default App;