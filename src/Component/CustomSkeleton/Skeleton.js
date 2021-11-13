import React from 'react'
import './Skeleton.css'
export default function Skeleton() {
    return (
        <div className="container">
            <div className="img-container"></div>
            <div className="user-info">
                <div className="skeleton-lines"></div>
                <div className="skeleton-lines"></div>
                <div className="skeleton-lines"></div>
                <div className="skeleton-lines"></div>
                <div className="skeleton-lines"></div>
            </div>
        </div>
    )
}
