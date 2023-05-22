import React from 'react'

export default function reservation() {
  return (
    <div>
      <h4>Réserve une place dans le restaurant</h4>
      <iframe
        src="https://tableagent.com/iframe/quai-antique/"
        style={{ border: '0px none', minWidth: '375px', minHeight: '736px' }}
        sandbox="allow-forms allow-modals allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        width="100%"
        height="100%"
      ></iframe>


    </div>
  )
}
