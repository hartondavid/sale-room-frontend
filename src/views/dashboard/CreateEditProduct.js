import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { apiCreateProduct, apiGetProductById, apiUpdateProduct } from "../../api/products";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast, addStyleToTextField } from "../../utils/utilFunctions";
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const CreateEditProduct = ({
}) => {
    const navigate = useNavigate(); // Initialize navigate function
    const { productId } = useParams();
    //Dialog for image path
    const [dialogContent, setDialogContent] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);  // For the modal
    const [fileForImagePath, setFileForImagePath] = useState(null);

    const [confirm, setConfirm] = useState(false);

    const currDate = new Date();
    currDate.setSeconds(0);
    currDate.setMilliseconds(0);
    currDate.setMinutes(0);

    const toDatetimeLocal = (date) => {
        if (!date) return '';
        // Convert UTC date to local datetime-local string (yyyy-MM-ddTHH:mm)
        const d = new Date(date);
        d.setSeconds(0, 0);
        const off = d.getTimezoneOffset();
        const local = new Date(d.getTime() - off * 60 * 1000);
        return local.toISOString().slice(0, 16);
    };

    const [formData, setFormData] = useState({
        name: '',
        initial_price: 0,
        description: '',
        photo: null,
        status: 'active',
        startTime: '',
        endTime: '',
    });

    useEffect(() => {
        if (productId && productId !== "0") {
            apiGetProductById((response) => {
                parseProductResponse(response.data);
                setConfirm(true);
            }, showErrorToast, productId)

        }
    }, [productId])

    const parseProductResponse = (data) => {
        setFormData({
            name: data.name || '',
            initial_price: data.initial_price || 0,
            description: data.description || '',
            photo: process.env.NODE_ENV === 'development' ? data.photo : `${process.env.REACT_APP_API_URL}/${data.photo}`,
            status: data.status || 'active',
            startTime: toDatetimeLocal(data.start_date),
            endTime: toDatetimeLocal(data.end_date),
        });
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Open the dialog
    const handleOpenDialog = (dialogTitle, dialogContent) => {
        setDialogContent(dialogContent)
        setDialogTitle(dialogTitle)
        setDialogOpen(true);
    };

    // Close the dialog
    const handleCloseDialog = () => {
        setDialogContent('')
        setDialogTitle('')
        setDialogOpen(false);
        //setFile(null);
    };



    // Handle file change
    const handleFileForImagePathChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileForImagePath(selectedFile);
        setFormData({ ...formData, photo: URL.createObjectURL(selectedFile) }); // Update the state to show the preview

    };

    // Handle confirmation for photo upload
    const handleConfirmForImagePath = () => {
        if (fileForImagePath) {
            setFormData({ ...formData, photo: URL.createObjectURL(fileForImagePath) });
            handleCloseDialog();
            setConfirm(true);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert local datetime-local input to UTC ISO string
        const toUTCISOString = (localDateString) => {
            if (!localDateString) return null;
            // localDateString is in 'yyyy-MM-ddTHH:mm' format
            const local = new Date(localDateString);
            return local.toISOString(); // always UTC
        };

        const payload = {
            name: formData.name,
            initial_price: formData.initial_price,
            description: formData.description,
            start_date: toUTCISOString(formData.startTime),
            end_date: toUTCISOString(formData.endTime),
        };

        if (fileForImagePath) {
            payload.photo = fileForImagePath;
        }

        if (productId === '0') {
            apiCreateProduct((response) => { navigate(-1); showSuccessToast(response.message) }, showErrorToast, payload)
        } else {
            apiUpdateProduct((response) => { navigate(-1) }, showErrorToast, productId, payload)
        }
    };
    return (
        <>
            <Box sx={{ marginLeft: '10px', marginRight: '10px', p: 2 }}  >
                <Typography variant="h4">
                    <span className="font-bold text-black">{productId === "0" ? "Adauga produs" : "Editeaza produs"}</span>
                </Typography>

                <form onSubmit={handleSubmit}>

                    {/* Display photo or add photo button */}
                    <Box sx={{
                        position: 'relative',
                        display: 'inline-block',
                        marginTop: '20px',
                        marginBottom: '20px',
                        opacity: formData.status === 'inactive' ? 0.6 : 1,
                        pointerEvents: formData.status === 'inactive' ? 'none' : 'auto'
                    }}>
                        {formData.status === 'inactive' && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    zIndex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'text.secondary',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        padding: '4px 12px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Inactiv
                                </Typography>
                            </Box>
                        )}
                        {formData.photo && confirm ? (
                            <>
                                <img
                                    src={formData.photo}
                                    alt=""
                                    style={{
                                        maxHeight: '300px',
                                        maxWidth: '300px',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                    onError={(e) => {
                                        console.error('Image failed to load:', formData.photo);
                                        e.target.src = '/no-image.svg';
                                    }}
                                />
                                {formData.status !== 'inactive' && (
                                    <Button
                                        variant="contained"
                                        onClick={() => handleOpenDialog("Schimba poza", "Va rugam selectati o noua poza pentru produs", "photo")}
                                        sx={{
                                            position: 'absolute',
                                            bottom: '30px',
                                            right: '10px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            },
                                            borderRadius: '20px',
                                            padding: '8px 16px',
                                            fontSize: '0.875rem',
                                            textTransform: 'none',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                        startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                                    >
                                        Schimba poza
                                    </Button>
                                )}
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() => handleOpenDialog("Adauga poza", "Va rugam adaugati o poza pentru produs", "photo")}
                                disabled={formData.status === 'inactive'}
                                sx={{
                                    width: '300px',
                                    height: '200px',
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        border: '2px dashed #666',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    textTransform: 'none'
                                }}
                            >
                                <AddPhotoAlternateIcon sx={{ fontSize: '2.5rem', color: '#666' }} />
                                <Typography variant="body1" sx={{ color: '#666' }}>
                                    Adauga poza
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#999' }}>
                                    Click pentru a selecta o imagine
                                </Typography>
                            </Button>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >
                        <TextField
                            label="Nume"
                            name="name"
                            type='string'
                            value={formData.name || ''}
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                            sx={addStyleToTextField(formData.name)}
                        >
                        </TextField>
                        <TextField
                            label='Pret'
                            name="initial_price"
                            type="number"
                            value={formData.initial_price || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            sx={addStyleToTextField(formData.initial_price)}
                        />
                        <TextField
                            label='Descriere'
                            name="description"
                            type="string"
                            value={formData.description || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            sx={addStyleToTextField(formData.description)}
                        />
                        <TextField
                            label="Data de inceput"
                            type="datetime-local"
                            name="startTime"
                            value={formData.startTime}
                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ marginTop: '1rem' }}
                            inputProps={{
                                min: new Date().toISOString().slice(0, 16),
                            }}
                            sx={addStyleToTextField(formData.startTime)}
                        />
                        <TextField
                            label="Data de sfarsit"
                            type="datetime-local"
                            name="endTime"
                            value={formData.endTime}
                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            style={{ marginTop: '1rem' }}
                            inputProps={{
                                min: new Date().toISOString().slice(0, 16),
                            }}
                            sx={addStyleToTextField(formData.endTime)}
                        />

                        {/* Dialog for confirmation and file upload */}
                        {dialogOpen && (
                            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                                <DialogTitle>{dialogTitle}</DialogTitle>
                                <DialogContent>
                                    <Box>

                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*,.pdf"
                                            onChange={handleFileForImagePathChange}
                                        />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} color="error" variant="contained" >Anuleaza</Button>
                                    <Button onClick={handleConfirmForImagePath} sx={{
                                        backgroundColor: 'rgb(133, 20, 20)', color: 'white',
                                        '&:hover': { backgroundColor: 'rgb(133, 20, 20)' }
                                    }} variant="contained" >Confirma</Button>

                                </DialogActions>
                            </Dialog>
                        )}


                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                            <Button type="submit" variant="contained" sx={{ mr: 1, mb: 1, backgroundColor: 'rgb(133, 20, 20)', color: 'white' }}>
                                {productId === "0" ? 'Adauga produs' : 'Editeaza produs'}
                            </Button>
                            <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => navigate(-1)}>
                                Renunta
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default CreateEditProduct;