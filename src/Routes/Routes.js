import LandingPage from '../LandingPage';
import app from '../App'

// app.get('*', (req, res) => {
//   // eslint-disable-next-line no-undef
//   res.sendFile(join(__dirname, 'build', 'index.html'));
// });

let Routes = [
  { path: "/", element: <LandingPage /> },
];
export default Routes;