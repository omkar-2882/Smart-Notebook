import React from 'react'

export function Alert(props) {

    // const capitalize = (word) => {
    //     const lower = word.toLowerCase();
    //     return lower.charAt(0).toUpperCase() + lower.slice(1);
    // }

    return (
        <div id="alert" className='' style={{height: '15px'}}>
        {props.alert && <div className={`py-0 mx-1 alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            {/* <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} */}
            {props.alert.msg}
        </div>}
        </div>
    )
}
