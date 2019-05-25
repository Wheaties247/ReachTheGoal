import React from "react"

const Button = props =>{
      const {children, handleClick} = props;
      console.log("Button Props", props)


  return (
    <div 
    className="button" 
    onClick={handleClick}
    >
    {children}
    </div>
    )
}
export default Button