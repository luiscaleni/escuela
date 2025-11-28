import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

function Chart() {
  const [chartData, setChartData] = useState(null)
  

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      const res = await fetch(
        "http://localhost/API/src/getConsults/plantationGraphic.php?country=Argentina"
      )

      const json = await res.json()

      setChartData({
        labels: json.map(item => item.province),
        datasets: [
          {
            data: json.map(item => item.total)
          }
        ]
      })
    } catch (e) {
      if (import.meta.env.DEV) {console.error("Error cargando datos:", e)}
    }
  }

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <h2>Plantaciones por Provincia</h2>
      {chartData ? <Pie data={chartData} /> : <p>Cargando...</p>}
    </div>
  )
}

export default Chart
