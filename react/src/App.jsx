import 'bootswatch/dist/sketchy/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/src/sweetalert2.scss'
import './App.css';

import Compoment from "./compoment/index.jsx";
import RenderingElement from "./rendering-element/index.jsx";
import HandlingEvent from "./handling-event/index.jsx";
import StateCompoment from "./state-compoment/index.jsx";
import BaiTap25 from "./baitap-25/index.jsx";
import Comunicate from "./comunicate/index.jsx";

function App() {
  return (
      // <Compoment />
      <>
          {/*<RenderingElement/>*/}
          {/*<HandlingEvent/>*/}
          {/*<StateCompoment/>*/}
          <BaiTap25/>
          {/*<Comunicate/>*/}
      </>
  );
}

export default App;
