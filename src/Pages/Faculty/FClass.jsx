import { useLoaderData } from "react-router-dom"
import { getData } from "../../CRUDdata"
import { Link } from "react-router-dom"

export async function fclassLoader({params}){
    const {username}=params
    return getData(`http://localhost:3002/api/json/showclass/${username}/faculty`)
}

function FClass (){

    const classes=useLoaderData()
    return (
        <>
            {classes.map((cl,i)=>
            <div  key={i}>
                <Link to={`${cl.class_name}`}>
                    <div>
                        {cl.class_name}
                    </div>
                </Link> <br />
            </div>
            )}                
        </>
    )
}

export default FClass