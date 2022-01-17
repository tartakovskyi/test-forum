import React from 'react'
import PropTypes from 'prop-types'

const InfoBlock = ({ errors, success }) => {
    if (errors) {
        return (
            <div className="alert alert-danger" role="alert">
                <ul>
                    {Object.keys(errors).map((errorId) => (
                        <li key={errorId}>{errors[errorId]}</li>
                    ))}
                </ul>
            </div>
        )
    }

    if (success) {
        return (
            <div className="alert alert-success" role="alert">
                {success}
            </div>
        )
    }
}

InfoBlock.propTypes = {
    errors: PropTypes.object,
    success: PropTypes.string,
}

export default InfoBlock
