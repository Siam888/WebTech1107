import Books from "./pages/Books";
import "./style.css"
import { Routes, Route } from 'react-router'
import NotFound from "./pages/NotFound";


export default function App() {
    return (
        <div>
            <h1>Books</h1>
            <Routes>
                <Route path="/" element={<Books />}></Route>
                <Route path="/*" element={<NotFound />}></Route>
            </Routes>
        </div>
    )
}