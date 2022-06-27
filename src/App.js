import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Engines from './pages/Engines';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import TableMonitoring from './pages/TableMonitoring';
function App() {
  // const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState({ title: '', body: '' });
  // const [isTokenFound, setTokenFound] = useState(false);
  // getToken(setTokenFound);
  // React.useEffect(() => {
  //   requestPermission();
  // });

  // onMessageListener()
  //   .then((payload) => {
  //     setNotification({
  //       title: payload.notification.title,
  //       body: payload.notification.body,
  //     });
  //     console.log(payload);
  //     alert(payload.notification.title);
  //   })
  //   .catch((err) => console.log('failed: ', err));

  function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // console.log('Notification permission granted.');
      }
    });
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/" />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/table" element={<TableMonitoring />} />
        <Route path="/admin/machines" element={<Engines />} />
      </Route>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />
    </Routes>
  );
}

export default App;
