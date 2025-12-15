import { useParams } from "react-router-dom";//import useParams hook 

export default function PropertyById() {
    const { id } = useParams();//access the dynamic part :id in the URL 

    return <div>PropertyById {id}</div>;
}