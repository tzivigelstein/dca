import {Bar} from "react-chartjs-2"
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend} from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

interface Props {
  capital: number
  prices: number[]
  dispersionFactor: number
}

const DistributionChart = ({capital, prices, dispersionFactor}: Props) => {
  const distributeCapitalWithDispersion = (capital: number, prices: number[], dispersionFactor: number) => {
    const inverses = prices.map(price => 1 / price)
    const dispersedInverses = inverses.map(inverse => inverse ** dispersionFactor)
    const sumDispersedInverses = dispersedInverses.reduce((a, b) => a + b, 0)

    const capitalAllocated = dispersedInverses.map(
      dispersedInverse => (dispersedInverse / sumDispersedInverses) * capital
    )
    const unitsBought = capitalAllocated.map((allocation, i) => allocation / prices[i])
    const totalUnits = unitsBought.reduce((a, b) => a + b, 0)
    const averagePurchasePrice = capital / totalUnits

    return {capitalAllocated, averagePurchasePrice}
  }

  const {capitalAllocated, averagePurchasePrice} = distributeCapitalWithDispersion(capital, prices, dispersionFactor)

  const data = {
    labels: prices.map(price => `Price: $${price}`),
    datasets: [
      {
        label: "Capital Allocated",
        data: capitalAllocated,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  }

  type Position = "top" | "right" | "bottom" | "left" | "center" | "chartArea"

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as Position
      },
      title: {
        display: true,
        text: "Distribution Dispersion"
      }
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <Bar data={data} options={options} />
      <p className="mt-4 text-center">Average Purchase Price: ${averagePurchasePrice.toFixed(2)}</p>
    </div>
  )
}

export default DistributionChart
