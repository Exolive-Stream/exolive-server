import { uniqueId } from "lodash"
import { useRef } from "react"

import styles from "./textfield.module.css"


export function TextField({ type = 'text', value, label, onInput, onChange }) {
  const idRef = useRef(uniqueId('tf-'));

  return (
    <div className={styles.container}>
      <input
        type={type}
        id={idRef.current}
        className={styles.input}
        required=""
        value={value} 
        onInput={onInput}
        onChange={onChange}
      />
      <label 
        htmlFor={idRef.current} 
        className={styles.label}
        children={label}
      />
      <div className={styles.underline}></div>
    </div>
  )

}