import s from './Modal.module.css';

export default function Modal({ config, onClose }) {
  const { title, message, icon, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, variant = 'default' } = config;

  function handleConfirm() {
    onConfirm?.();
    onClose();
  }

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={`${s.box} ${s[variant]}`} onClick={e => e.stopPropagation()}>
        {icon && <div className={s.icon}><i className={icon} /></div>}
        <h2 className={s.title}>{title}</h2>
        {message && <p className={s.message}>{message}</p>}
        <div className={s.actions}>
          <button className={s.cancel} onClick={onClose}>{cancelLabel}</button>
          <button className={`${s.confirm} ${s[variant + 'Btn']}`} onClick={handleConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
