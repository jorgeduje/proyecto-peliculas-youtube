import React from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";

import {useFormik} from "formik"
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateMovieModal = ({ open, handleClose, setIsMovieCreate }) => {

  let initialValues = {
    name: "",
    description: "",
    createdAt: "",
    img: ""
  }

  const onSubmit = (data)=>{
    
    let arg = {
      name: data.name,
      description: data.description,
      img: data.img,
      createdAt: data.createdAt,
      isLiked: false
    }

    axios.post("http://localhost:5000/movies", arg )
    .then( res => {
      handleClose()
      setIsMovieCreate(true)
    } )
    .catch(error => console.log(error))

  }


  const { handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema,
    onSubmit
  })


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "400px",
            }}
            onSubmit={handleSubmit}
          >

            <Typography variant="h6" color="primary"> Agregar pelicula </Typography>
            <TextField
              id="outlined-basic"
              label="Titulo de la pelicula"
              variant="outlined"
              name="name"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Fecha de creacion"
              variant="outlined"
              name="createdAt"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Descripcion"
              variant="outlined"
              name="description"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="adjuntar URL de la imagen"
              variant="outlined"
              name="img"
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Agregar</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateMovieModal;
