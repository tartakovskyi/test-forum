import React from 'react'


const ShowMoreBtn = ({ onClick }) => {
    
    return (
        <div className="text-center mt-5">
            <button 
                type="button"
                className="btn action_btn"
                onClick={onClick}
            >
                Show More...
            </button>
        </div>
    )
}


export default ShowMoreBtn
