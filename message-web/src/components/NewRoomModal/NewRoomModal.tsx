import {
  Button,
  Card,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { isNil } from 'lodash';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(80%, 400px)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface NewRoomModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (roomId: string, username: string) => void;
}

const NewRoomFormValidation = Yup.object().shape({
  roomId: Yup.string()
    .required('Room ID is required')
    .matches(RegExp('^[0-9]{4}$'), 'Room ID contains 4 digits'),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'username must between 3 and 12 characters')
    .max(12, 'username must between 3 and 12 characters'),
});

const NewRoomModal: React.FC<NewRoomModalProps> = ({
  open,
  handleClose,
  handleSubmit,
}) => {
  return (
    <Modal open={open} aria-labelledby="new-room-modal-title">
      <Card sx={style}>
        <Stack spacing={4}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new room
          </Typography>
          <Formik
            initialValues={{
              roomId: '',
              username: '',
            }}
            validationSchema={NewRoomFormValidation}
            onSubmit={({ roomId, username }) => handleSubmit(roomId, username)}
            enableReinitialize
            validateOnChange
            validateOnBlur
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Stack
                  spacing={2}
                  direction="column"
                  useFlexGap
                  flexWrap="wrap"
                  alignItems="flex-end"
                >
                  <TextField
                    error={touched.roomId && !isNil(errors.roomId)}
                    helperText={
                      touched.roomId && !isNil(errors.roomId)
                        ? errors.roomId
                        : null
                    }
                    id="roomId"
                    name="roomId"
                    label="Room ID"
                    variant="outlined"
                    placeholder="XXXX"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ alignSelf: 'stretch' }}
                  />

                  <TextField
                    error={touched.roomId && !isNil(errors.username)}
                    helperText={
                      touched.username && !isNil(errors.username)
                        ? errors.username
                        : null
                    }
                    id="username"
                    name="username"
                    label="Username"
                    variant="outlined"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ alignSelf: 'stretch' }}
                  />

                  <Stack direction="row" spacing={2}>
                    <Button
                      type="button"
                      variant="text"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Card>
    </Modal>
  );
};

export default NewRoomModal;
