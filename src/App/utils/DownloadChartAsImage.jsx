import html2canvas from "html2canvas"

export default function DownloadChartAsImage(value) {
    const chart = document.getElementById("chartToDownload")

    if (!chart) return

    html2canvas(chart, {
        backgroundColor: "#ffffff"
    }).then((canvas) => {
        const link = document.createElement("a")

        const now = new Date()
        const fileName = `${value}_${now.toISOString().slice(0, 10)}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.png`

        link.download = fileName
        link.href = canvas.toDataURL("image/png")
        link.click()
    })
}
