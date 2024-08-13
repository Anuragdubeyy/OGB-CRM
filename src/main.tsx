import ReactDOM from 'react-dom/client'
import App from './routes/index';
import './index.css'
import store  from './store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
  <App />
  <ToastContainer />

  </BrowserRouter>
</Provider>,
)
