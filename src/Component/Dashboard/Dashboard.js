import React,{useEffect,useState} from 'react'
import { getUser, removeUserSession } from '../../Utility/util'
import { useNavigate } from 'react-router-dom';
import Skeleton from '../CustomSkeleton/Skeleton';
import './Dashboard.css'

export default function Dashboard(props) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isDataFetching,setDataFetching]=useState(false);
    const [data, setData] = useState([]);
    const [isReady,setReady]=useState(false)

    console.log("getUser()", getUser())
    if (getUser() === false) {
        setTimeout(() => {
            navigate('/')
        },100)
    }

    const logout = () => {
        removeUserSession();
        navigate('/')
    }

    useEffect(() => {
        setDataFetching(true)
        const TestUrl='http://demo8597236.mockable.io/';
        const githun=`https://api.github.com/users?since=${currentPage*10}&per_page=10`
      //as instructed timeout will run for 1 sec
      setTimeout(()=>{
        fetch(TestUrl).then(res =>
            res.json()
          ).then(data1=>{
            console.log(data1)
            setReady(true)
           setData(state=>[...state,...data1])
           setDataFetching(false)
          })
      },1000)
      }, [currentPage])

const UserInfo=(user)=>{
    return(
        <div className="container">
        <div className="user-img">
            <img src={user.avatar_url||''} alt=""/>
        </div>
        <div className="user-details">
            <div className="user-info">UserName: {user.login}</div>
            <div className="user-info">Github url: {user.html_url}</div>
            <div className="user-info">User Type: {user.type}</div>
            <div className="user-info">Site Admin: {user.site_admin}</div>
            <div className="user-info">Repo url: {user.repos_url}</div>
        </div>
    </div>
    )
}

    return (
        <div className="dashboard-container">
          <nav> 
              <div className="title">Test App</div>
               <button className="logout_cta" onClick={logout}>Logout</button>
               </nav>
          <section>
          {isReady?data.map(user=>UserInfo(user)):"Error loading data.."}
          {isDataFetching?  <Skeleton/>:''}
           <button onClick={()=>setCurrentPage(currentPage+1)}>Load More</button>
          </section>

        </div>
    )
}
