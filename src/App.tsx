import { HashRouter, Route, Routes } from "react-router-dom";
import CreateNote from "./pages/CreateNote/CreateNote";
import Notes from "./pages/Notes/Notes";
import Layout from "./components/Layout/Layout";
import EditNote from "./components/EditNote/EditNote";

function App() {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route exact path="/*" element={<Notes/>}/>
                    <Route path="/create/" element={<CreateNote/>}/>
                    <Route path="/edit/:id" element={<EditNote />} />
                </Routes>
            </Layout>
        </HashRouter>
    )
}

export default App
