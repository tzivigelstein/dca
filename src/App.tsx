import {useState} from "react"
import "./App.css"
import DistributionChart from "./components/DistributionChart"

function App() {
  const [capital, setCapital] = useState(6400)
  const [prices, setPrices] = useState("63387, 60769, 59161")
  const [dispersionFactor, setDispersionFactor] = useState(4)

  return (
    <div className="App">
      <h1 className="text-3xl text-center">DCA with Dispersion</h1>
      <main className="p-4">
        <div className="max-w-2xl mx-auto mt-10">
          <form className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capital">
                Capital (USD)
              </label>
              <input
                type="number"
                id="capital"
                value={capital}
                onChange={e => setCapital(Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prices">
                Prices (comma separated)
              </label>
              <input
                type="text"
                id="prices"
                value={prices}
                onChange={e => setPrices(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dispersionFactor">
                Dispersion Factor
              </label>
              <input
                type="number"
                id="dispersionFactor"
                value={dispersionFactor}
                onChange={e => setDispersionFactor(Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>

          <DistributionChart
            capital={capital}
            prices={prices.split(",").map(price => parseFloat(price.trim()))}
            dispersionFactor={dispersionFactor}
          />
        </div>
      </main>
    </div>
  )
}

export default App
