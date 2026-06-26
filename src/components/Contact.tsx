/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Send, CheckCircle2, ShieldAlert, HeartHandshake, Compass } from 'lucide-react';
import { BRAND_INFO } from '../data';

export default function Contact() {
  const [formValues, setFormValues] = useState({
    fullName: '',
    emailAddress: '',
    subject: 'Wholesale/Distribution',
    messageContent: ''
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formValues.fullName.trim()) {
      errors.fullName = 'FULL NAME IS REQUIRED FOR COMPLIANCE';
    }
    if (!formValues.emailAddress.trim()) {
      errors.emailAddress = 'EMAIL ADDRESS IS REQUIRED';
    } else if (!/\S+@\S+\.\S+/.test(formValues.emailAddress)) {
      errors.emailAddress = 'INVALID COMMUNICATIONS ROUTE';
    }
    if (!formValues.messageContent.trim()) {
      errors.messageContent = 'TRANSMISSION MESSAGE CONTENT CANNOT BE EMPTY';
    }
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate tactical transmit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormValues({
        fullName: '',
        emailAddress: '',
        subject: 'Wholesale/Distribution',
        messageContent: ''
      });
      // Clear success banner after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <section id="contact-form-section" className="relative min-h-screen bg-black pt-28 pb-20 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-noise opacity-45 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lime-950/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Core Header */}
        <div id="contact-header" className="max-w-2xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-3.5 py-1.5 mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-purple-500"></span>
            <span className="font-mono text-[9px] font-bold tracking-[0.2em] text-purple-400 uppercase">
              REACH OUT
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-none mb-4">
            READY TO PULL THE PIN?
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Have distribution inquiries, wholesale proposals, or feedback for our R&D lab? Send a tactical transmission directly to our Milan HQ or NYC office.
          </p>
        </div>

        {/* Content Split: Coordinates vs Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: HQ physical offices */}
          <div id="coordinates-panel" className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="rounded-2xl border border-white/[0.03] bg-zinc-950/60 p-8 backdrop-blur-md space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Headquarters</h3>
                <p className="text-lg font-medium text-white">Bangladesh</p>
              </div>
              
              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Direct Wire</h3>
                <p className="text-lg font-medium text-white">01766998555</p>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Digital Transmission</h3>
                <a href="mailto:shawonshanto104141@gmail.com" className="text-lg font-medium text-lime-400 hover:underline">
                  shawonshanto104141@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: High contrast dark input form */}
          <div id="message-panel" className="lg:col-span-7 rounded-3xl border border-white/[0.05] bg-zinc-950 p-8 sm:p-10 shadow-xl relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-lime-400 pointer-events-none rounded-t-3xl" />
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* Success Interface */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center flex flex-col items-center justify-center h-full"
                >
                  <div className="h-16 w-16 bg-lime-400/10 border border-lime-400/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-lime-400" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-white tracking-wide uppercase">
                    TACTICAL TRANSMISSION RECEIVED
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-md leading-relaxed">
                    Our crew has successfully logged your request in our Milan R&D queue. A dedicated team member will contact you shortly on your secure route.
                  </p>
                  <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-8 block">
                    TRANSMIT CODE // SECURE_CIAO_004
                  </span>
                </motion.div>
              ) : (
                /* Main Message Form */
                <motion.form
                  key="active-form"
                  onSubmit={handleFormSubmit}
                  className="flex flex-col gap-5 text-left"
                >
                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Full Name */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="font-mono text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formValues.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g., Johnny Strike"
                        autoComplete="name"
                        aria-invalid={!!formErrors.fullName}
                        aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                        className={`w-full rounded-xl border ${
                          formErrors.fullName ? 'border-rose-500 bg-rose-500/5' : 'border-white/[0.06] bg-zinc-900/60 focus:border-white/[0.2]'
                        } px-4 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all`}
                      />
                      {formErrors.fullName && (
                        <span id="fullName-error" className="font-mono text-[9px] text-rose-500 font-bold tracking-wide flex items-center gap-1 mt-0.5">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          {formErrors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label htmlFor="emailAddress" className="font-mono text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                        EMAIL ROUTE *
                      </label>
                      <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        value={formValues.emailAddress}
                        onChange={handleInputChange}
                        placeholder="e.g., strike@rebel.io"
                        autoComplete="email"
                        aria-invalid={!!formErrors.emailAddress}
                        aria-describedby={formErrors.emailAddress ? 'email-error' : undefined}
                        className={`w-full rounded-xl border ${
                          formErrors.emailAddress ? 'border-rose-500 bg-rose-500/5' : 'border-white/[0.06] bg-zinc-900/60 focus:border-white/[0.2]'
                        } px-4 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all`}
                      />
                      {formErrors.emailAddress && (
                        <span id="email-error" className="font-mono text-[9px] text-rose-500 font-bold tracking-wide flex items-center gap-1 mt-0.5">
                          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                          {formErrors.emailAddress}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="font-mono text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                      TRANSMISSION SUBJECT
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formValues.subject}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-white/[0.06] bg-zinc-900/60 focus:border-white/[0.2] px-4 py-3.5 text-xs text-white focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Wholesale/Distribution" className="bg-zinc-950 text-white">Wholesale / Regional Distribution</option>
                      <option value="R&D Feedback" className="bg-zinc-950 text-white">R&D Lab Feedback / Ingredients Inquiry</option>
                      <option value="Press & Collaboration" className="bg-zinc-950 text-white">Press, Media & Cultural Collabs</option>
                      <option value="Sponsorship Requests" className="bg-zinc-950 text-white">Athlete & Event Sponsorships</option>
                    </select>
                  </div>

                  {/* Message Content */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="messageContent" className="font-mono text-[9px] font-bold tracking-widest text-zinc-400 uppercase">
                      TRANSMISSION CONTENT *
                    </label>
                    <textarea
                      id="messageContent"
                      name="messageContent"
                      value={formValues.messageContent}
                      onChange={handleInputChange}
                      rows={5}
                      placeholder="Input wholesale request specs, volume requirements, or testing lab reviews here..."
                      autoComplete="off"
                      aria-invalid={!!formErrors.messageContent}
                      aria-describedby={formErrors.messageContent ? 'message-error' : undefined}
                      className={`w-full rounded-xl border ${
                        formErrors.messageContent ? 'border-rose-500 bg-rose-500/5' : 'border-white/[0.06] bg-zinc-900/60 focus:border-white/[0.2]'
                      } px-4 py-3.5 text-xs text-white placeholder-zinc-500 focus:outline-none transition-all resize-none`}
                    />
                    {formErrors.messageContent && (
                      <span id="message-error" className="font-mono text-[9px] text-rose-500 font-bold tracking-wide flex items-center gap-1 mt-0.5">
                        <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                        {formErrors.messageContent}
                      </span>
                    )}
                  </div>

                  {/* Tactical Send Trigger */}
                  <button
                    type="submit"
                    id="tactical-submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 flex items-center justify-center gap-3 rounded-xl bg-white text-black py-4 text-xs font-black tracking-widest hover:bg-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.35)] disabled:opacity-70 disabled:cursor-not-allowed transition-all group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>SENDING ROUTE SECURE...</span>
                      </>
                    ) : (
                      <>
                        <span>PULL THE PIN</span>
                        <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom support grid cards (4 columns) */}
        <div id="contact-purity-badges" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          
          <div className="p-5 rounded-2xl bg-zinc-950 border border-white/[0.03] flex flex-col justify-between text-left">
            <Compass className="w-5 h-5 text-purple-400" />
            <div className="mt-8">
              <h4 className="font-display font-black text-white text-sm uppercase tracking-wide">
                QUICK SHIP DISPATCH
              </h4>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                Orders dispatch from Milan or New York within 24 hours of batch approval.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-white/[0.03] flex flex-col justify-between text-left">
            <HeartHandshake className="w-5 h-5 text-lime-400" />
            <div className="mt-8">
              <h4 className="font-display font-black text-white text-sm uppercase tracking-wide">
                24/7 SUPPORT CREW
              </h4>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                Connect directly with our discord squad or live agents for secure cargo tracking.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-white/[0.03] flex flex-col justify-between text-left">
            <CheckCircle2 className="w-5 h-5 text-pink-400" />
            <div className="mt-8">
              <h4 className="font-display font-black text-white text-sm uppercase tracking-wide">
                PURE BATCH R&D LABS
              </h4>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                Every batch is manufactured inside our EFSA certified chemical-free facility.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-white/[0.03] flex flex-col justify-between text-left">
            <ShieldAlert className="w-5 h-5 text-sky-400" />
            <div className="mt-8">
              <h4 className="font-display font-black text-white text-sm uppercase tracking-wide">
                CLEAN BURN PROMISE
              </h4>
              <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                Completely zero artificial additives, artificial sugars, or synthetic caffeine.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
