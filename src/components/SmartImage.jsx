import { useState } from 'react'

// Imagem com lazy loading nativo, skeleton de carregamento e fade-in suave.
export default function SmartImage({ src, alt, className = '', imgClassName = '', priority = false }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 skeleton" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-700 ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } ${imgClassName}`}
      />
    </div>
  )
}
