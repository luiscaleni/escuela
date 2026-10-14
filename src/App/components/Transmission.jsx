import React from 'react'

const Transmission = () => {
  // Reemplaza esto con el ID real de tu canal de YouTube (empieza con UC...)
  const CHANNEL_ID = "UCCroGX6ANJQUdcXc-sVOK7A/livestreaming/dashboard"; 

  return (
    <div className="video-container" style={{
      position: 'relative',
      paddingBottom: '56.25%', // Relación de aspecto 16:9
      height: 0,
      overflow: 'hidden',
      maxWidth: '100%',
      backgroundColor: '#000'
    }}>
      <iframe
        src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=1&mute=1`}
        title="Transmisión en Vivo"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}

export default Transmission;