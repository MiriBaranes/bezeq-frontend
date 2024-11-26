import {Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

const ButtonForNavigate =({path,title})=>{
    const navigate = useNavigate();
    return (
        <Button color="inherit" onClick={() => navigate(path)}>
            {title}
        </Button>
    )
}
export default ButtonForNavigate;
