import cx from "classix"
import { navigate } from "wouter/use-browser-location"

export function TextLogo({withoutLink}) { 
  return (
    <span 
      className={cx(
        'font-bold text-white', 
        !withoutLink && 'cursor-pointer'
      )}
      onClick={!withoutLink && (() => navigate('/'))}
    >
      <span className='text-pink-500 italic'>Exo</span><span className='bg-pink-500 text-black ml-1 px-1 rounded-lg'>Live</span>
    </span>
  )
}