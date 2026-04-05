import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { addItemToCart, getDeliveryDate, saveCart } from '../../utils/cart';
import s from './Checkout.module.css';

const PAY_OPTIONS = [
  { id: 'gcash', label: 'GCash', src: './Shop/GCash.png' },
  { id: 'paypal', label: 'PayPal', src: './Shop/Paypal.jpg' },
  { id: 'mastercard', label: 'Mastercard', src: './Shop/MasterCard.png' },
];

export default function Checkout() {
  const { setShowCheckout, setCartItems, cartItems, selectedProduct, showToast } = useContext(AppContext);

  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedPay, setSelectedPay] = useState(null);
  const [cod, setCod] = useState(false);
  const [step, setStep] = useState('form');
  const [fieldEdit, setFieldEdit] = useState(null);
  const [fieldValue, setFieldValue] = useState('');

  function openField(field) {
    setFieldEdit(field);
    setFieldValue(field === 'address' ? address : field === 'email' ? email : mobile);
  }

  function confirmField() {
    if (fieldEdit === 'address') setAddress(fieldValue);
    else if (fieldEdit === 'email') setEmail(fieldValue);
    else setMobile(fieldValue);
    setFieldEdit(null);
  }

  function handlePurchase() {
    if (!address || !email || !mobile) {
      showToast({ type: 'error', message: 'Please fill in all required details.' });
      return;
    }
    if (!selectedPay && !cod) {
      showToast({ type: 'error', message: 'Please select a payment method.' });
      return;
    }

    setStep('processing');
    setTimeout(() => {
      setStep('success');
      const dateDeliver = getDeliveryDate();

      setCartItems(prev => {
        let updated;
        if (!selectedProduct) {
          updated = prev.map(item =>
            item.isSelected ? { ...item, isSelected: false, status: 'To Deliver', dateDeliver } : item
          );
        } else {
          const exists = prev.find(i => i.name === selectedProduct.name);
          if (exists) {
            updated = prev.map(i =>
              i.name === selectedProduct.name
                ? { ...i, isSelected: false, status: 'To Deliver', dateDeliver }
                : i
            );
          } else {
            updated = [...prev, { ...selectedProduct, count: 1, isSelected: false, status: 'To Deliver', dateDeliver }];
          }
        }
        saveCart(updated);
        return updated;
      });

      setTimeout(() => {
        setShowCheckout(false);
        setStep('form');
      }, 2000);
    }, 2500);
  }

  return (
    <div className={s.overlay} onClick={() => step === 'form' && setShowCheckout(false)}>
      <div className={s.sheet} onClick={e => e.stopPropagation()}>
        <div className={s.header}>
          <h2>Checkout</h2>
          <button onClick={() => setShowCheckout(false)} className={s.closeBtn} aria-label="Close">
            <i className="fa fa-times" />
          </button>
        </div>

        {step === 'form' && (
          <>
            <section className={s.section}>
              <h3 className={s.sectionTitle}>Shipping Details</h3>
              <div className={s.field} onClick={() => openField('address')}>
                <i className="far fa-compass" />
                <div className={s.fieldContent}>
                  <span className={s.fieldLabel}>Address</span>
                  <span className={s.fieldValue}>{address || 'Tap to enter'}</span>
                </div>
                <i className="fa fa-chevron-right" />
              </div>
            </section>

            <section className={s.section}>
              <h3 className={s.sectionTitle}>Contact</h3>
              <div className={s.field} onClick={() => openField('email')}>
                <i className="fa fa-envelope" />
                <div className={s.fieldContent}>
                  <span className={s.fieldLabel}>Email</span>
                  <span className={s.fieldValue}>{email || 'Tap to enter'}</span>
                </div>
                <i className="fa fa-chevron-right" />
              </div>
              <div className={s.field} onClick={() => openField('mobile')}>
                <i className="fa fa-phone" />
                <div className={s.fieldContent}>
                  <span className={s.fieldLabel}>Mobile</span>
                  <span className={s.fieldValue}>{mobile || 'Tap to enter'}</span>
                </div>
                <i className="fa fa-chevron-right" />
              </div>
            </section>

            <section className={s.section}>
              <h3 className={s.sectionTitle}>Payment</h3>
              <div className={s.payOptions}>
                {PAY_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    className={`${s.payOpt} ${selectedPay === opt.id ? s.paySelected : ''}`}
                    onClick={() => { setSelectedPay(opt.id); setCod(false); }}
                  >
                    <img src={opt.src} alt={opt.label} />
                  </button>
                ))}
              </div>
              <label className={s.codRow}>
                <input
                  type="checkbox"
                  checked={cod}
                  onChange={e => { setCod(e.target.checked); setSelectedPay(null); }}
                />
                Cash on Delivery
              </label>
            </section>

            <button className={s.confirmBtn} onClick={handlePurchase}>
              Place Order
            </button>
          </>
        )}

        {step === 'processing' && (
          <div className={s.status}>
            <div className={s.spinner} />
            <p>Processing your order…</p>
          </div>
        )}

        {step === 'success' && (
          <div className={s.status}>
            <div className={s.successIcon}><i className="fa fa-check" /></div>
            <p>Order placed successfully!</p>
          </div>
        )}
      </div>

      {fieldEdit && (
        <div className={s.fieldOverlay} onClick={() => setFieldEdit(null)}>
          <div className={s.fieldSheet} onClick={e => e.stopPropagation()}>
            <div className={s.header}>
              <h3>{fieldEdit === 'address' ? 'Address' : fieldEdit === 'email' ? 'Email' : 'Mobile Number'}</h3>
              <button onClick={() => setFieldEdit(null)}><i className="fa fa-times" /></button>
            </div>
            <input
              className={s.fieldInput}
              type={fieldEdit === 'email' ? 'email' : fieldEdit === 'mobile' ? 'tel' : 'text'}
              placeholder={
                fieldEdit === 'address' ? 'e.g. 123 Main St, City' :
                fieldEdit === 'email' ? 'e.g. you@email.com' : 'e.g. 09123456789'
              }
              value={fieldValue}
              onChange={e => setFieldValue(e.target.value)}
              autoFocus
            />
            <button className={s.confirmBtn} onClick={confirmField}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}
