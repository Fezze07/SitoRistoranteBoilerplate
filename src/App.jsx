import Navbar from './components/Navbar'
import FloatingCTA from './components/FloatingCTA'
import Hero from './sections/Hero'
import About from './sections/About'
import Menu from './sections/Menu'
import Gallery from './sections/Gallery'
import Info from './sections/Info'
import Footer from './sections/Footer'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Info />
      </main>

      <Footer />

      {/* FloatingCTA è fuori da <main> perché è posizionato fixed e non fa parte del flusso della pagina */}
      <FloatingCTA />
    </>
  )
}

export default App
