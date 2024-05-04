import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { StyledContainer } from './Home.styled';
import NewRoomModal from '../NewRoomModal/NewRoomModal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const createRoom = (roomId: string, username: string) => {
    navigate(`/room/${roomId}`, { state: { username } });
  };

  return (
    <StyledContainer maxWidth="lg">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Messages
          </Typography>
          <Button color="inherit" onClick={() => setIsOpen(true)}>
            New Room
          </Button>
          <NewRoomModal
            open={isOpen}
            handleSubmit={createRoom}
            handleClose={() => setIsOpen(false)}
          />
        </Toolbar>
      </AppBar>
    </StyledContainer>
  );
};

export default Home;
