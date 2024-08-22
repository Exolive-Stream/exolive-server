
import cx from 'classix'
import modernStyles from './modern.module.css'
import sendStyles from './send.module.css'

export function SendButton({ icon, href, children, onClick }) {
  return (
    <a
      className={sendStyles.button}
      onClick={onClick}
      href={href}
    >
      <div className={sendStyles.svg_wrapper_1}>
        <div className={sendStyles.svg_wrapper}>
          { icon }
          {/* <svg
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            ></path>
          </svg> */}
        </div>
      </div>
      <span> {children} </span>
    </a>

  )
}

export function ModernButton({ className, children, href, download }) {
  return (
    <a
      className={'m-1 ' + modernStyles.animated_button}
      data-aos='fade-right'
      data-aos-delay='200'
      href={href}
      download={download}
    >
      <svg className={modernStyles.arr_2} viewBox='0 0 24 24'>
        <path
          d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z'
        ></path>
      </svg>
      <span className={modernStyles.text}> {children} </span>
      <span className={modernStyles.circle}></span>
      <svg className={modernStyles.arr_1} viewBox='0 0 24 24'>
        <path
          d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z'
        ></path>
      </svg>
    </a>
  )
}