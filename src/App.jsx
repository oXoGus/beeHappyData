const showTitle = false

function App() {
  
  const onClick = (e) => {
    console.log(e)
    alert('Hello World')  
  }
  
  return (
    <div className="App">
      {showTitle && <h1 onClick={onClick}>Hello World</h1>}
    </div>
  )
}

export default App
