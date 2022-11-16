import { Button, Typography } from '@mui/material'
import React from 'react'

const Header = ( {setFavorite} ) => {
  return (
    <div style={{
        backgroundColor: "black",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        padding: "10px",
        alignItems: "center"
        }}>

            <Typography variant="h4" color="primary">Peliculas</Typography>
            <div style={{display:"flex", justifyContent: "center", gap:"10px"}}>
                <Button variant="contained" color="primary" onClick={()=>setFavorite(false)}>Todos</Button>
                <Button variant="contained" color="primary" onClick={()=>setFavorite(true)}>Favoritos</Button>
            </div>

    </div>
  )
}

export default Header