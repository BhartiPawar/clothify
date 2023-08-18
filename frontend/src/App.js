import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import SigninScreen from './screen/SigninScreen';
import SignupScreen from './screen/SignupScreen';

function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
            </Routes>
          </Container>
        </main>
        {/* <footer>
          <div className="text-center">All rights reserved</div>
        </footer> */}
      </div>
    </BrowserRouter>
  );
}
export default App;
