import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Toast.module.css';

export default function Toast({ config, onClose }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef(null);
  const DURATION = 3000;
  const TICK = 50;

  useEffect(() => {
    setVisible(true);
    setProgress(100);

    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += TICK;
      setProgress(100 - (elapsed / DURATION) * 100);
      if (elapsed >= DURATION) {
        clearInterval(intervalRef.current);
        setVisible(false);
        setTimeout(onClose, 300);
      }
    }, TICK);

    return () => clearInterval(intervalRef.current);
  }, [config]);

  function handleClick() {
    if (config.type === 'success') {
      navigate('/Cart');
    }
    onClose();
  }

  return (
    <div
      className={`${s.toast} ${s[config.type]} ${visible ? s.show : s.hide}`}
      onClick={handleClick}
    >
      <i className={config.type === 'success' ? 'far fa-check-circle' : 'fa fa-exclamation-circle'} />
      <span>{config.message}</span>
      <div className={s.bar}>
        <div className={s.progress} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
