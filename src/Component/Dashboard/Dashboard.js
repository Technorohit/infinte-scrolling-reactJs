import React, { useEffect, useState } from 'react'
import { getUser, removeUserSession } from '../../Utility/util'
import { useNavigate } from 'react-router-dom';
import Skeleton from '../CustomSkeleton/Skeleton';
import './Dashboard.css'

export default function Dashboard(props) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [isDataFetching, setDataFetching] = useState(false);
    const [data, setData] = useState([]);
    const [isReady, setReady] = useState(false)
    const [isMobile, setMobile] = useState(false)

    if (getUser() === false) {
        setTimeout(() => {
            navigate('/')
        }, 100)
    }

    const logout = () => {
        removeUserSession();
        navigate('/')
    }
    useEffect(() => {
        if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
            setMobile(true)
        }

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("touchmove", handleScroll);// touchmove for mobile

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("touchmove", handleScroll);
        };
    })

    useEffect(() => {
        setDataFetching(true)
        const TestUrl = 'http://demo8597236.mockable.io/';
        //deployed the custom response on above 3rd party api service because of github 60request per hour limitation
        // you can replace the github to test the pagination 
        const github = `https://api.github.com/users?since=${currentPage * 10}&per_page=10`
        //as instructed timeout will run for 1 sec
        setTimeout(() => {
            fetch(TestUrl).then(res =>
                res.json()
            ).then(data1 => {
                setReady(true)
                setData(state => [...state, ...data1])
                setDataFetching(false)
            }).catch(e => {
                setDataFetching(false);
            })
        }, 1000)
    }, [currentPage])

    const handleScroll = (event) => {
        console.log("event", isMobile)

        if (isMobile) {
            if (document.documentElement.scrollHeight - window.pageYOffset === window.innerHeight) {
                setCurrentPage(currentPage + 1)
            }
        }
        else {
            const { scrollTop, clientHeight, scrollHeight } = event.srcElement.scrollingElement;
            if (scrollHeight - scrollTop === clientHeight) {
                setCurrentPage(currentPage + 1)
            }
        }

        // console.log("scrollTop,clientHeight,scrollHeight",scrollTop,clientHeight,scrollHeight)
    }

    const UserInfo = (user) => {
        return (
            <div className="container-box">
                <div className="user-img">
                    <img src={user.avatar_url || ''} alt="" />
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
            <div>
                {isReady ? data.map(user => UserInfo(user)) : " loading data.."}
            </div>
            <div className="loader-section">{isDataFetching ? <div className="loader" /> : ''}
            </div>
        </div>
    )
}
