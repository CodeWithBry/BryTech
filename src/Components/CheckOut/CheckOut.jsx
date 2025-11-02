import { useContext, useEffect, useRef, useState } from 'react'
import { context } from '../../App'
import s from "./CheckOut.module.css"

function CheckOut() {
    const { lightMode, setShowPurchase,
        setCartItems, showPurchase,
        setErrorNotif, cartItems,
        selectedProduct } = useContext(context)
    const imageConRef = useRef()
    const [cashOnDelivery, setCashOnDelivery] = useState(false)
    const [typeOfInput, setTypeOfInput] = useState(null)
    const [loading, setLoading] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [failedToPurchase, setFailedToPurchase] = useState(false)
    const [address, setAddress] = useState(null)
    const [email, setEmail] = useState(null)
    const [mobile, setMobile] = useState(null)
    const [selectedOption, setSelectedOption] = useState(null)
    const [payOptions, setPayOptions] = useState([
        { option: "GCash", src: "./Shop/GCash.png", isSelected: false },
        { option: "PayPal", src: "./Shop/Paypal.jpg", isSelected: false },
        { option: "Master Card", src: "./Shop/MasterCard.png", isSelected: false },
    ])

    function handlePurchase() {
        setProcessing(true)
        setLoading(true)
        setFailedToPurchase(false)
        setTimeout(() => {
            if (selectedOption == null && !cashOnDelivery || (address == null || email == null || mobile == null)) {
                if (address == null || email == null || mobile == null) {
                    setErrorNotif("Please Put The Necessary Details!")
                } else {
                    setErrorNotif("Please Select A Payment Option!")
                }
                setLoading(false)
                setFailedToPurchase(true)
                return setTimeout(() => {
                    setProcessing(false)
                }, 3000);
            }
            setLoading(false)
            setTimeout(() => {
                setProcessing(false)
                setShowPurchase(false)
                setCartItems(prev => {
                    if (!selectedProduct) {
                        const updatedItems = prev.map((item) => {
                            return item.isSelected ? { ...item, isSelected: false, status: "To Deliver" } : { ...item }
                        })

                        localStorage.setItem("cartItems", JSON.stringify(updatedItems))

                        return updatedItems
                    } else {
                        const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
                        const formatted = twoDaysFromNow.toLocaleString("default", { month: "long", day: "numeric" });

                        const updatedCart = prev.map((item) => {
                            if (item.name == selectedProduct.name) return { ...item, count: item?.count != null ? item.count : 1, isSelected: false, dateDeliver: formatted, status: "To Deliver" }
                            return { ...item }
                        })
                        const addedProduct = [...prev, { ...selectedProduct, count: 1, isSelected: false, dateDeliver: formatted, status: "To Deliver" }]

                        function checkCart() {
                            for (let i in prev) {
                                if (selectedProduct.name == cartItems[i].name) return "Same"
                            }
                        }

                        if (checkCart() == "Same") {
                            localStorage.setItem("cartItems", JSON.stringify(updatedCart))
                            return [...updatedCart]
                        } else {
                            localStorage.setItem("cartItems", JSON.stringify(addedProduct))
                            return [...addedProduct]
                        }
                    }
                })
            }, 3000);
        }, 3000);
    }

    function InputInformation() {
        if (typeOfInput == "address") {
            return <div className={s.inputBox}>
                <h2>
                    Full Address
                    <button
                        onClick={() => { setTypeOfInput(null), setAddress(null) }}
                        className={s.unshowPayment}><i className="fa fa-close"></i></button>
                </h2>
                <input type="text"
                    placeholder='e.g. 0740 Bartolome St. Bunducan, Bocaue, Bulacan'
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }} />
                <button onClick={() => setTypeOfInput(false)}>Confirm</button>
            </div>
        } else if (typeOfInput == "email") {
            return <div className={s.inputBox}>
                <h2>
                    Email
                    <button
                        onClick={() => { setTypeOfInput(null), setEmail(null) }}
                        className={s.unshowPayment}><i className="fa fa-close"></i></button>
                </h2>
                <input type="text"
                    placeholder='e.g. (example.gmail.com)'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                <button onClick={() => setTypeOfInput(false)}>Confirm</button>
            </div>
        } else if (typeOfInput == "phone") {
            return <div className={s.inputBox}>
                <h2>
                    Mobile Number
                    <button
                        onClick={() => { setTypeOfInput(null), setMobile(null) }}
                        className={s.unshowPayment}><i className="fa fa-close"></i></button>
                </h2>
                <input type="text"
                    placeholder='e.g. (09123456789)'
                    onChange={(e) => {
                        setMobile(e.target.value)
                    }} />
                <button onClick={() => setTypeOfInput(false)}>Confirm</button>
            </div>
        }
    }

    function Processing() {

        return <>
            <div className={s.loadingScreen}>
                <div className={s.loadingbox}>
                    <div className={loading ? s.circleBox : `${s.circleBox} ${s.hideCircleBox}`}>
                        <div className={s.loadingCircle}></div>
                        <h1>Please Wait...</h1>
                    </div>
                    {!loading && <div className={failedToPurchase ? s.failedToPurchase : s.successfulPayment}>
                        <i className={failedToPurchase == false ? "fa fa-check" : "fa fa-close"}></i>
                        {failedToPurchase == false ? "Payment Successful" : "Failed To Purchase"}
                    </div>}
                </div>
            </div>

        </>
    }

    if (showPurchase) return (
        <>
            <div className={lightMode ? s.checkOut : `${s.checkOut} ${s.darkCheckOut}`}>
                {typeOfInput && <div className={s.inputBoxWrapper}>
                    <InputInformation />
                </div>}
                {processing && <Processing />}
                <div className={s.checkOutBox}>

                    <div className={s.top}>
                        <h1>
                            Payment
                        </h1>
                        <button
                            onClick={() => { setShowPurchase(false) }}
                            className={s.unshowPayment}><i className="fa fa-close"></i></button>
                    </div>

                    <div className={s.part}>
                        <h2>Shipping To </h2>
                        <div className={s.card} onClick={() => setTypeOfInput("address")}>
                            <div className={s.left}><i className='far fa-compass'></i></div>
                            <div className={s.right}>
                                <div className={s.top}>Address <i className='fa fa-edit' ></i></div>
                                <h2>{address ? address : "N/A"}</h2>
                            </div>
                        </div>
                    </div>
                    <div className={s.part}>
                        <h2>Contact Information  </h2>
                        <div className={s.card} onClick={() => setTypeOfInput("email")}>
                            <div className={s.left}><i className='fa fa-envelope'></i></div>
                            <div className={s.right}>
                                <div className={s.top}>Email <i className='fa fa-edit' ></i></div>
                                <h2>{email ? email : "N/A"}</h2>
                            </div>
                        </div>
                        <div className={s.card} onClick={() => setTypeOfInput("phone")}>
                            <div className={s.left}><i className='	fa fa-phone'></i></div>
                            <div className={s.right}>
                                <div className={s.top}>Phone Number <i className='fa fa-edit' ></i></div>
                                <h2>{mobile ? mobile : "N/A"}</h2>
                            </div>
                        </div>
                    </div>
                    <div className={s.part}>
                        <h2>Payment Method</h2>
                        <div className={s.paymentOptions}>
                            {payOptions.map((option) => {
                                return <img src={option.src} className={option.isSelected && s.selected} key={option.option} alt={option.src} onClick={() => {
                                    setCashOnDelivery(false)
                                    setPayOptions(prev => prev.map((opt) => {
                                        if (option.option == opt.option) { setSelectedOption(option) }
                                        return option.option == opt.option ? { ...opt, isSelected: true } : { ...opt, isSelected: false }
                                    }))
                                }} />
                            })}

                        </div>
                        <div className={s.cashOnDeliver}>
                            <input type="checkbox" checked={cashOnDelivery} onChange={(e) => { setCashOnDelivery(e.target.checked), setSelectedOption(null), e.target.value && setPayOptions(prev => prev.map(opt => ({ ...opt, isSelected: false }))) }} />
                            Cash On Delivery
                        </div>
                    </div>

                    <button
                        onClick={() => handlePurchase()}
                        className={s.confirm}>
                        Confirm
                    </button>
                </div>

                <div className={s.background} onClick={() => { setShowPurchase(false), setSelectedOption(null), setPayOptions(prev => prev.map(opt => ({ ...opt, isSelected: false }))) }}></div>
            </div>

        </>

    )
}

export default CheckOut