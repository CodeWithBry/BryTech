import { useRef, useState } from "react";
import { useApp } from "../../context/AppContext";
import s from "./CheckOut.module.css";

const INITIAL_PAY_OPTIONS = [
  { option: "GCash", src: "./Shop/GCash.png", isSelected: false },
  { option: "PayPal", src: "./Shop/Paypal.jpg", isSelected: false },
  { option: "Master Card", src: "./Shop/MasterCard.png", isSelected: false },
];

function InputField({ label, placeholder, onConfirm, onCancel }) {
  const [value, setValue] = useState("");
  return (
    <div className={s.inputBox}>
      <div className={s.inputHeader}>
        <h3>{label}</h3>
        <button onClick={onCancel}><i className="fa fa-times" /></button>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        autoFocus
      />
      <button className={s.confirmBtn} onClick={() => onConfirm(value)}>Confirm</button>
    </div>
  );
}

export default function CheckOut() {
  const { showPurchase, setShowPurchase, setCartItems, setErrorNotif, cartItems, selectedProduct } = useApp();
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [typeOfInput, setTypeOfInput] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [address, setAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [payOptions, setPayOptions] = useState(INITIAL_PAY_OPTIONS);

  function selectPayOption(option) {
    setCashOnDelivery(false);
    setSelectedOption(option);
    setPayOptions(prev => prev.map(o => ({ ...o, isSelected: o.option === option.option })));
  }

  function handlePurchase() {
    setProcessing(true);
    setLoading(true);
    setFailed(false);

    setTimeout(() => {
      const missingDetails = !address || !email || !mobile;
      const missingPayment = !selectedOption && !cashOnDelivery;

      if (missingDetails || missingPayment) {
        setErrorNotif(missingDetails ? "Please fill in all required details." : "Please select a payment method.");
        setLoading(false);
        setFailed(true);
        setTimeout(() => setProcessing(false), 3000);
        return;
      }

      setLoading(false);
      setTimeout(() => {
        setProcessing(false);
        setShowPurchase(false);
        const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
        const dateDeliver = twoDaysFromNow.toLocaleString("default", { month: "long", day: "numeric" });

        setCartItems(prev => {
          let updated;
          if (!selectedProduct) {
            updated = prev.map(item =>
              item.isSelected ? { ...item, isSelected: false, status: "To Deliver" } : item
            );
          } else {
            const exists = prev.find(item => item.name === selectedProduct.name);
            if (exists) {
              updated = prev.map(item =>
                item.name === selectedProduct.name
                  ? { ...item, isSelected: false, dateDeliver, status: "To Deliver" }
                  : item
              );
            } else {
              updated = [...prev, { ...selectedProduct, count: 1, isSelected: false, dateDeliver, status: "To Deliver" }];
            }
          }
          localStorage.setItem("cartItems", JSON.stringify(updated));
          return updated;
        });
        resetForm();
      }, 3000);
    }, 3000);
  }

  function resetForm() {
    setAddress(null);
    setEmail(null);
    setMobile(null);
    setSelectedOption(null);
    setCashOnDelivery(false);
    setPayOptions(INITIAL_PAY_OPTIONS);
  }

  function close() {
    setShowPurchase(false);
    resetForm();
  }

  if (!showPurchase) return null;

  return (
    <div className={s.overlay}>
      <div className={s.backdrop} onClick={close} />

      {typeOfInput && (
        <div className={s.inputOverlay}>
          {typeOfInput === "address" && (
            <InputField
              label="Full Address"
              placeholder="e.g. 123 Main St, Bocaue, Bulacan"
              onConfirm={v => { setAddress(v); setTypeOfInput(null); }}
              onCancel={() => { setAddress(null); setTypeOfInput(null); }}
            />
          )}
          {typeOfInput === "email" && (
            <InputField
              label="Email"
              placeholder="e.g. you@example.com"
              onConfirm={v => { setEmail(v); setTypeOfInput(null); }}
              onCancel={() => { setEmail(null); setTypeOfInput(null); }}
            />
          )}
          {typeOfInput === "phone" && (
            <InputField
              label="Mobile Number"
              placeholder="e.g. 09123456789"
              onConfirm={v => { setMobile(v); setTypeOfInput(null); }}
              onCancel={() => { setMobile(null); setTypeOfInput(null); }}
            />
          )}
        </div>
      )}

      {processing && (
        <div className={s.processingOverlay}>
          <div className={s.processingBox}>
            {loading ? (
              <>
                <div className={s.spinner} />
                <p>Please wait...</p>
              </>
            ) : (
              <div className={failed ? s.statusFailed : s.statusSuccess}>
                <i className={failed ? "fa fa-times" : "fa fa-check"} />
                <span>{failed ? "Purchase failed" : "Payment successful!"}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={s.modal}>
        <div className={s.modalHeader}>
          <h2>Checkout</h2>
          <button onClick={close}><i className="fa fa-times" /></button>
        </div>

        <section className={s.section}>
          <h4>Shipping Address</h4>
          <div className={s.infoCard} onClick={() => setTypeOfInput("address")}>
            <i className="far fa-compass" />
            <div>
              <span className={s.cardLabel}>Address <i className="fa fa-pencil" /></span>
              <p>{address || "Not set"}</p>
            </div>
          </div>
        </section>

        <section className={s.section}>
          <h4>Contact Information</h4>
          <div className={s.infoCard} onClick={() => setTypeOfInput("email")}>
            <i className="fa fa-envelope" />
            <div>
              <span className={s.cardLabel}>Email <i className="fa fa-pencil" /></span>
              <p>{email || "Not set"}</p>
            </div>
          </div>
          <div className={s.infoCard} onClick={() => setTypeOfInput("phone")}>
            <i className="fa fa-phone" />
            <div>
              <span className={s.cardLabel}>Phone <i className="fa fa-pencil" /></span>
              <p>{mobile || "Not set"}</p>
            </div>
          </div>
        </section>

        <section className={s.section}>
          <h4>Payment Method</h4>
          <div className={s.payOptions}>
            {payOptions.map(opt => (
              <img
                key={opt.option}
                src={opt.src}
                alt={opt.option}
                className={opt.isSelected ? `${s.payImg} ${s.paySelected}` : s.payImg}
                onClick={() => selectPayOption(opt)}
              />
            ))}
          </div>
          <label className={s.codLabel}>
            <input
              type="checkbox"
              checked={cashOnDelivery}
              onChange={e => {
                setCashOnDelivery(e.target.checked);
                if (e.target.checked) {
                  setSelectedOption(null);
                  setPayOptions(INITIAL_PAY_OPTIONS);
                }
              }}
            />
            Cash on Delivery
          </label>
        </section>

        <button className={s.purchaseBtn} onClick={handlePurchase}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}
