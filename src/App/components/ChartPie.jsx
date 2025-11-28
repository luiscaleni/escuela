import { useEffect, useState } from "react"
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts"
import { CONFIG_BACKEND } from "../config/config"

function ChartPie({ country }) {
    const [data, setData] = useState([])

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(
                    `${CONFIG_BACKEND.API_DIR}/src/getConsults/plantationGraphic.php?country=${country}`
                )
                const json = await res.json()
                setData(json)
            } catch (err) {
                if (import.meta.env.DEV) { console.error("Error cargando datos:", err)}
            }
        }

        load()
    }, [country])

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

    return (
        <div id="chartToDownload" style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="province_plant"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ChartPie
