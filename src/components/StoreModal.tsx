/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, CreditCard, ShieldAlert, CheckCircle2, ShoppingBag } from 'lucide-react';
import { ProductFlavor } from '../types';
import { FLAVORS } from '../data';
import ThreeDCan from './ThreeDCan';

interface StoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { [id: string]: number };
  onUpdateQuantity: (id: string, qty: number) => void;
  onClearCart: () => void;
}

export default function StoreModal({ isOpen, onClose, cartItems, onUpdateQuantity, onClearCart }: StoreModalProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'receipt'>('cart');
  const [focusedFlavorId, setFocusedFlavorId] = useState<string>(FLAVORS[0].id);
  const [shippingValues, setShippingValues] = useState({
    fullName: '',
    emailAddress: '',
    shippingAddress: '',
    postalCode: '',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••'
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const cartKeys = Object.keys(cartItems).filter((key) => cartItems[key] > 0);
  
  // Safe resolved active/focused flavor for the 3D preview
  const activeFlavorId = cartKeys.includes(focusedFlavorId) 
    ? focusedFlavorId 
    : (cartKeys[0] || (FLAVORS[0] && FLAVORS[0].id) || '');
  const activeFlavor = FLAVORS.find((f) => f.id === activeFlavorId) || FLAVORS[0];
  
  // Pack price
  const packPrice = 29.99; // 12 premium slim cans

  const getSubtotal = () => {
    return cartKeys.reduce((acc, key) => {
      return acc + (cartItems[key] * packPrice);
    }, 0);
  };

  const getShippingFee = () => {
    const sub = getSubtotal();
    if (sub === 0) return 0;
    return sub > 75 ? 0 : 5.99; // Free ship over $75
  };

  const getTotal = () => {
    return getSubtotal() + getShippingFee();
  };

  const handleQtyChange = (flavorId: string, delta: number) => {
    const current = cartItems[flavorId] || 0;
    const next = Math.max(0, current + delta);
    onUpdateQuantity(flavorId, next);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!shippingValues.fullName.trim()) newErrors.fullName = 'FULL NAME REQUIRED';
    if (!shippingValues.emailAddress.trim()) newErrors.emailAddress = 'EMAIL ADDR REQUIRED';
    if (!shippingValues.shippingAddress.trim()) newErrors.shippingAddress = 'SHIPPING ADDR REQUIRED';
    if (!shippingValues.postalCode.trim()) newErrors.postalCode = 'POSTAL/ZIP REQUIRED';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('receipt');
    }, 2200);
  };

  const handleFinish = () => {
    onClearCart();
    setStep('cart');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="store-modal-container" className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Checkout Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative z-10 w-full max-w-lg bg-zinc-950 border-l border-white/[0.05] flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)]"
          >
            {/* Drawer Header */}
            <div className="h-20 border-b border-white/[0.04] px-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-lime-400" />
                <span className="font-display font-black text-sm text-white tracking-widest uppercase">
                  {step === 'cart' && 'TACTICAL CARGO BAG'}
                  {step === 'checkout' && 'SECURE DEPLOYMENT'}
                  {step === 'receipt' && 'ORDER MANIFEST SENT'}
                </span>
              </div>
              <button
                id="store-close-btn"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Scrollable Main Area */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {step === 'cart' && (
                <div className="flex flex-col gap-6">
                  {cartKeys.length === 0 ? (
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-zinc-700 mb-4" />
                      <h4 className="font-display font-extrabold text-white text-lg">YOUR BAG IS EMPTY</h4>
                      <p className="text-zinc-500 text-xs mt-2 max-w-xs leading-relaxed">
                        Add our pure high-octane 12-pack energy fuel flavors inside our Products catalog.
                      </p>
                      <button
                        onClick={onClose}
                        className="mt-6 rounded-full border border-white/[0.1] hover:border-lime-400/30 bg-zinc-900 px-6 py-2.5 text-xs font-bold text-white transition-all"
                      >
                        BROWSE THE FUEL
                      </button>
                    </div>
                  ) : (
                    /* Cart list */
                    <div className="flex flex-col gap-4">
                      {/* Interactive 3D focus showcase box */}
                      <div className="relative w-full h-52 bg-zinc-950 border border-white/[0.04] rounded-2xl flex items-center justify-center overflow-hidden mb-2 group/canvas">
                        <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />
                        
                        {/* Interactive WebGL 3D Can element */}
                        <div className="absolute inset-0 flex items-center justify-center scale-90">
                          <ThreeDCan 
                            currentFlavor={activeFlavor}
                            isAutoSpin={true}
                            spinSpeed={1.4}
                            glossiness={0.9}
                            metalSheen={true}
                          />
                        </div>

                        {/* Top HUD stamps */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span 
                            className="h-1.5 w-1.5 rounded-full animate-ping"
                            style={{ 
                              backgroundColor: activeFlavor.themeHex 
                            }}
                          />
                          <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
                            3D CARGO LAB FOCUS
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 font-mono text-[9px] text-white bg-white/[0.03] border border-white/[0.05] px-2 py-0.5 rounded uppercase">
                          {activeFlavor.name}
                        </div>

                        {/* Bottom Instructions HUD stamp */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[8px] text-zinc-600 uppercase tracking-widest bg-black/60 border border-white/[0.02] px-2.5 py-1 rounded-full opacity-60 group-hover/canvas:opacity-100 transition-opacity">
                          [ DRAG TO ROTATE INTENSELY ]
                        </div>
                      </div>

                      <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase text-left">
                        SELECTED CARGO (12-PACK CORES)
                      </div>

                      {cartKeys.map((flavorId) => {
                        const flavor = FLAVORS.find((f) => f.id === flavorId);
                        if (!flavor) return null;
                        const qty = cartItems[flavorId];
                        const isFocused = activeFlavorId === flavorId;

                        return (
                          <div 
                            key={flavorId} 
                            onMouseEnter={() => setFocusedFlavorId(flavorId)}
                            onClick={() => setFocusedFlavorId(flavorId)}
                            className={`flex items-center gap-4 p-4 rounded-xl border relative transition-all duration-300 cursor-pointer ${
                              isFocused 
                                ? 'bg-zinc-900/80 border-white/[0.12] shadow-md' 
                                : 'bg-zinc-900/40 border-white/[0.03] hover:bg-zinc-900/60 hover:border-white/[0.07]'
                            }`}
                          >
                            {/* Color Bar indicator */}
                            {isFocused && (
                              <div 
                                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                                style={{ backgroundColor: flavor.themeHex }}
                              />
                            )}

                            <img
                              src={flavor.imageUrl}
                              alt={flavor.name}
                              loading="lazy"
                              className="h-16 w-auto object-contain shrink-0 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                            
                            <div className="flex-1 text-left">
                              <span className="font-display font-black text-xs text-white uppercase block leading-none">
                                {flavor.name}
                              </span>
                              <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase block mt-1">
                                12-Pack Case // {flavor.volume}
                              </span>
                              <span className="font-mono text-xs font-bold text-lime-400 block mt-1">
                                ${(packPrice * qty).toFixed(2)}
                              </span>
                            </div>

                            {/* Qty controller */}
                            <div className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-white/[0.05] p-1 z-10" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleQtyChange(flavorId, -1)}
                                className="h-6 w-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-mono text-xs font-bold text-white px-2">
                                {qty}
                              </span>
                              <button
                                onClick={() => handleQtyChange(flavorId, 1)}
                                className="h-6 w-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800"
                                aria-label="Increase"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Quick-add recommendations inside bag drawer */}
                  {cartKeys.length > 0 && cartKeys.length < FLAVORS.length && (
                    <div className="border-t border-white/[0.04] pt-4 mt-4">
                      <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase mb-3 text-left">
                        ADD DIVERSITY FLAVORS
                      </div>
                      <div className="flex flex-col gap-2">
                        {FLAVORS.filter((f) => !cartKeys.includes(f.id)).slice(0, 2).map((recFlavor) => {
                          const isFocused = activeFlavorId === recFlavor.id;
                          return (
                            <div 
                              key={recFlavor.id} 
                              onMouseEnter={() => setFocusedFlavorId(recFlavor.id)}
                              onClick={() => setFocusedFlavorId(recFlavor.id)}
                              className={`flex items-center justify-between p-3 rounded-lg border border-dashed transition-all duration-300 cursor-pointer ${
                                isFocused 
                                  ? 'bg-zinc-900/60 border-white/[0.1] border-solid' 
                                  : 'bg-zinc-950 border-white/[0.04] hover:bg-zinc-900/20'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 text-left">
                                <img src={recFlavor.imageUrl} alt="" className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
                                <div>
                                  <span className="block font-display font-bold text-[11px] text-white uppercase">{recFlavor.name}</span>
                                  <span className="block font-mono text-[9px] text-zinc-500 mt-0.5">{recFlavor.subName}</span>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQtyChange(recFlavor.id, 1);
                                }}
                                className="font-mono text-[10px] font-black tracking-wider text-lime-400 border border-lime-400/20 rounded px-2.5 py-1 hover:bg-lime-400 hover:text-black transition-all"
                              >
                                + ADD PACK
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 'checkout' && (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5 text-left">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                    DEPLOYMENT SHIPPING COORDINATES
                  </div>

                  {/* Recipient Full Name */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-zinc-400 uppercase">FULL NAME</label>
                    <input
                      type="text"
                      value={shippingValues.fullName}
                      onChange={(e) => {
                        setShippingValues({ ...shippingValues, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`rounded-lg border px-3 py-2.5 text-xs text-white bg-zinc-900 focus:outline-none focus:border-white/[0.2] ${errors.fullName ? 'border-rose-500' : 'border-white/[0.04]'}`}
                      placeholder="e.g. Maverick Rebel"
                    />
                  </div>

                  {/* Email address */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-zinc-400 uppercase">EMAIL ROUTE</label>
                    <input
                      type="text"
                      value={shippingValues.emailAddress}
                      onChange={(e) => {
                        setShippingValues({ ...shippingValues, emailAddress: e.target.value });
                        if (errors.emailAddress) setErrors({ ...errors, emailAddress: '' });
                      }}
                      className={`rounded-lg border px-3 py-2.5 text-xs text-white bg-zinc-900 focus:outline-none focus:border-white/[0.2] ${errors.emailAddress ? 'border-rose-500' : 'border-white/[0.04]'}`}
                      placeholder="e.g. dispatch@rebel.com"
                    />
                  </div>

                  {/* Shipping Address */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-zinc-400 uppercase">STREET ADDRESS</label>
                    <input
                      type="text"
                      value={shippingValues.shippingAddress}
                      onChange={(e) => {
                        setShippingValues({ ...shippingValues, shippingAddress: e.target.value });
                        if (errors.shippingAddress) setErrors({ ...errors, shippingAddress: '' });
                      }}
                      className={`rounded-lg border px-3 py-2.5 text-xs text-white bg-zinc-900 focus:outline-none focus:border-white/[0.2] ${errors.shippingAddress ? 'border-rose-500' : 'border-white/[0.04]'}`}
                      placeholder="e.g. 34 Via della Moscova"
                    />
                  </div>

                  {/* Postal code */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[9px] text-zinc-400 uppercase">POSTAL / ZIP CODE</label>
                    <input
                      type="text"
                      value={shippingValues.postalCode}
                      onChange={(e) => {
                        setShippingValues({ ...shippingValues, postalCode: e.target.value });
                        if (errors.postalCode) setErrors({ ...errors, postalCode: '' });
                      }}
                      className={`rounded-lg border px-3 py-2.5 text-xs text-white bg-zinc-900 focus:outline-none focus:border-white/[0.2] ${errors.postalCode ? 'border-rose-500' : 'border-white/[0.04]'}`}
                      placeholder="e.g. 20121"
                    />
                  </div>

                  {/* Secure payment elements */}
                  <div className="border-t border-white/[0.05] pt-4 mt-2">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase mb-3">
                      SECURE STRIPE PERFORMANCE PORTAL
                    </div>
                    
                    <div className="rounded-xl border border-white/[0.05] bg-zinc-900/40 p-4 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-lime-400" />
                        <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase">MOCK ENCRYPTED TRANSACTION</span>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-3">
                        <input
                          type="text"
                          disabled
                          value={shippingValues.cardNumber}
                          className="col-span-2 rounded border border-white/[0.03] px-2.5 py-2 text-xs bg-zinc-950 text-zinc-500"
                        />
                        <input
                          type="text"
                          disabled
                          value={shippingValues.cardExpiry}
                          className="rounded border border-white/[0.03] px-2.5 py-2 text-xs bg-zinc-950 text-zinc-500 text-center"
                        />
                        <input
                          type="text"
                          disabled
                          value={shippingValues.cardCvc}
                          className="rounded border border-white/[0.03] px-2.5 py-2 text-xs bg-zinc-950 text-zinc-500 text-center"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {step === 'receipt' && (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="h-14 w-14 rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-7 h-7 text-lime-400 animate-bounce" />
                  </div>
                  <h3 className="font-display font-black text-xl text-white tracking-wide uppercase">
                    CARGO DEPLOYED PERFECTLY
                  </h3>
                  <p className="text-zinc-500 text-xs mt-2 max-w-sm leading-relaxed">
                    Transaction validated. Milan depot dispatch log recorded under security manifest #C-22684. Ready for instant alpine courier pick-up.
                  </p>

                  <div className="w-full border border-dashed border-white/[0.06] rounded-xl bg-zinc-900/30 p-5 mt-6 text-left flex flex-col gap-2.5">
                    <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest block border-b border-white/[0.04] pb-2">
                      LOGISTICS INVENTORY RECAP
                    </span>
                    {cartKeys.map((flavorId) => {
                      const flavor = FLAVORS.find((f) => f.id === flavorId);
                      if (!flavor) return null;
                      return (
                        <div key={flavorId} className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-300 font-bold uppercase">{flavor.name} x{cartItems[flavorId]}</span>
                          <span className="text-zinc-500">${(packPrice * cartItems[flavorId]).toFixed(2)}</span>
                        </div>
                      );
                    })}
                    <div className="flex items-center justify-between text-xs font-mono border-t border-white/[0.04] pt-3 font-extrabold">
                      <span className="text-white">TOTAL CHARGED</span>
                      <span className="text-lime-400">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Checkout Action Area */}
            {cartKeys.length > 0 && (
              <div className="border-t border-white/[0.04] bg-zinc-950 p-6 flex flex-col gap-4">
                {step !== 'receipt' && (
                  <div className="flex flex-col gap-2 border-b border-white/[0.04] pb-4">
                    <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                      <span>SUBTOTAL CORES</span>
                      <span className="text-zinc-300">${getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                      <span>CARGO ROUTE SHIPPING</span>
                      <span className="text-zinc-300">
                        {getShippingFee() === 0 ? 'FREE OVER $75' : `$${getShippingFee().toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-white font-display font-black mt-1">
                      <span>FINAL INVOICE</span>
                      <span className="text-lime-400 text-base">${getTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Direct Action triggers */}
                {step === 'cart' && (
                  <button
                    id="cart-submit-btn"
                    onClick={() => setStep('checkout')}
                    className="w-full rounded-xl bg-white text-black py-4 text-xs font-black tracking-widest hover:bg-lime-400 hover:shadow-lg transition-all uppercase"
                  >
                    PROCEED TO CARGO COORDINATES
                  </button>
                )}

                {step === 'checkout' && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('cart')}
                      className="rounded-xl border border-white/[0.08] bg-zinc-900 text-zinc-300 px-5 py-4 text-xs font-bold hover:bg-zinc-800 transition-colors uppercase"
                    >
                      BACK
                    </button>
                    <button
                      id="checkout-submit-btn"
                      onClick={handleCheckoutSubmit}
                      disabled={isProcessing}
                      className="flex-1 rounded-xl bg-lime-400 text-black py-4 text-xs font-black tracking-widest hover:bg-lime-300 hover:shadow-lg transition-all uppercase flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                          <span>AUTHORIZING PACKS...</span>
                        </>
                      ) : (
                        <span>DEPLOY CARGO SECURELY</span>
                      )}
                    </button>
                  </div>
                )}

                {step === 'receipt' && (
                  <button
                    id="receipt-finish-btn"
                    onClick={handleFinish}
                    className="w-full rounded-xl bg-white text-black py-4 text-xs font-black tracking-widest hover:bg-lime-400 transition-all uppercase"
                  >
                    FINISH DISPATCH MANIFEST
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
