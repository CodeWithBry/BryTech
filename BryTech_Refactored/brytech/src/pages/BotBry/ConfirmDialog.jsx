import s from "./ConfirmDialog.module.css";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className={s.overlay}>
      <div className={s.dialog}>
        <div className={s.iconWrap}>
          <i className="fa fa-trash" />
        </div>
        <h3>{message}</h3>
        <p>This action cannot be undone.</p>
        <div className={s.actions}>
          <button className={s.cancel} onClick={onCancel}>Cancel</button>
          <button className={s.confirm} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
