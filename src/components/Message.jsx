import React from 'react'

export default function Message ( { children, tipo } ) {
  return (
      <section className={`alerta ${tipo}`}>
          {children}
      </section>
  )
}
