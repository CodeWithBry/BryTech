import s from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={s.skeleton}>
      <div className={s.image} />
      <div className={s.body}>
        <div className={s.line} />
        <div className={`${s.line} ${s.short}`} />
      </div>
      <div className={s.footer}>
        <div className={`${s.line} ${s.price}`} />
      </div>
    </div>
  );
}
