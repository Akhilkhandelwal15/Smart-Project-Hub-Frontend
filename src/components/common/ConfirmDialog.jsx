import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
export const ConfirmDialog = ({open, title, description, confirmText, cancelText, actionColor, onClose, onConfirm})=>{
  return (
    <Dialog open={open} 
      sx={{
        "& .MuiPaper-root": {
          minWidth: 400, // width in pixels
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey',
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button  color="primary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button color={actionColor} variant="contained" onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}