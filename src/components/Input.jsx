function Input({ label, id, type = "text", value, onChange, disabled = false, required = false }) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
    </div>
  )
}

export default Input