import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
  ListItem,
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { ScrollableBox, StyledContainer } from './Room.style';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Send } from '@mui/icons-material';
import React from 'react';
import { stringAvatar } from '../../utils/helpers';
import { Message } from '../../utils/types';
import { Form, Formik } from 'formik';
import { useSocket } from '../../hooks/SocketProvider';

const Room: React.FC = () => {
  const { roomId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const socket = useSocket();
  const [sender, setSender] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (state && state.username) {
      setSender(state.username);
      socket?.emit('room:join', { roomId, sender: state.username });
    }
  }, [state]);

  useEffect(() => {
    socket?.on('message:out', values => {
      setMessages([...messages, { ...values }]);
    });
  }, [messages]);

  const exitRoom = () => {
    navigate('/', { replace: true });
  };

  const sendMessage = async (content: string) => {
    socket?.emit('message:in', { roomId, content, sender });
  };

  return (
    <StyledContainer maxWidth="lg">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Room ${roomId}`}
          </Typography>
          <Button color="inherit" onClick={exitRoom}>
            Exit
          </Button>
        </Toolbar>
      </AppBar>
      <ScrollableBox>
        <List sx={{ width: '100%' }}>
          {messages.map((m, index) => (
            <>
              <ListItem alignItems="flex-start" key={`${index}`}>
                <ListItemAvatar>
                  {sender && <Avatar {...stringAvatar(m.sender)} />}
                </ListItemAvatar>
                <ListItemText
                  primary={m.sender}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {m.content}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {messages.length - 1 > index && (
                <Divider variant="inset" component="li" key={'divider'} />
              )}
            </>
          ))}
        </List>
      </ScrollableBox>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={({ content }, { resetForm }) => {
          sendMessage(content).then(() => resetForm());
        }}
        enableReinitialize
      >
        {({ values, handleChange }) => (
          <Form
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: 'calc(100% - 2rem)',
              padding: '1rem',
            }}
          >
            <Stack
              direction="row"
              justifyContent="stretch"
              alignItems="stretch"
              spacing={2}
            >
              <TextField
                required
                placeholder="Send message"
                style={{ width: '100%' }}
                name="content"
                id="content"
                value={values.content}
                onChange={handleChange}
                autoFocus
              />
              <IconButton
                aria-label="send"
                size="large"
                color="primary"
                type="submit"
              >
                <Send />
              </IconButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default Room;
