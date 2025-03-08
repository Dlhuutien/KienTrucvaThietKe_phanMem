import Header from "./component/Header"
import MenuList from "./component/MenuList"
import Admin from "./pages/Admin"
function App() {

  return (
      <div style={{ display: 'flex', backgroundColor: '#ECEBEB', padding: 5}}>
        <div style={{ width: '20%', marginRight: '20px' }}>
          <MenuList />
        </div>
        <div style={{ width: '80%', gap: '20px', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Admin />
        </div>
      </div>
  )
}

export default App
