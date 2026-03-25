import React from 'react'
import './Loader.scss'

const Loader: React.FC = () => {
    return (
        <div className='loader-container'>
            <div className='loader-wrapper'>
                <div className='loader-spinner'>
                    <div className='spinner-ring'></div>
                    <div className='spinner-ring'></div>
                    <div className='spinner-ring'></div>
                    <div className='spinner-ring'></div>
                </div>
                <div className='loader-text'>
                    <h2>Loading...</h2>
                    <p>Creating your poster experience</p>
                </div>
            </div>
        </div>
    )
}

export { Loader }
