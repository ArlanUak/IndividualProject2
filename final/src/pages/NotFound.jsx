import { Link } from "react-router-dom"

export default function NotFound() {
    return (<div className="container">
        <div className="found">
            <h3>Произошла ошибка, перейдите пожалуйста на <Link to="/" > главную </Link></h3>
        </div>
    </div>)
}