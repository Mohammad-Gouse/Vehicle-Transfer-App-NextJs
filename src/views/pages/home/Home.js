import { Box, Container } from '@mui/material';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function Home() {


  return (
    <Box style={{width:'100vw', height: '100vh'}}>
      <Sidebar />
      <Box style={{width:'100vw', height: '100vh', paddingLeft: '90px'}}>
        <Header />
        <Container>
          <h1>Welcome to the Vehicle Management System</h1>
        </Container>
      </Box>
    </Box>
  );
}
