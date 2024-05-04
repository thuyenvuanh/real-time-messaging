import { Box, Container } from '@mui/material';
import styled from 'styled-components';

export const StyledContainer = styled(Container)`
  height: 100vh;
  position: relative;
`;

export const ScrollableBox = styled(Box)`
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  top: 56px;
  left: 0;
  bottom: 88px;
  width: 100%;
  height: calc(100vh - 56px - 88px);
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  ul::-webkit-scrollbar {
    display: none;
  }
`;
