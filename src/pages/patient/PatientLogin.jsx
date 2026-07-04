import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PatientLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [counter, setCounter] = useState(28);

  // OTP resend counter effect
  useEffect(() => {
    let timer;
    if (step === 2 && counter > 0) {
      timer = setInterval(() => {
        setCounter(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, counter]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setStep(2);
    setCounter(28);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newValues = [...otpValues];
    newValues[index] = value.substring(value.length - 1);
    setOtpValues(newValues);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // In a real application, verify OTP. For mock, redirect directly to home.
    navigate('/patient/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="bg-white rounded-xl border border-[#f3f4f6] p-8 w-full max-w-[400px]">
        
        {/* Logo centered */}
        <div className="w-10 h-10 rounded-full bg-[#1b504c] flex items-center justify-center mx-auto">
          <span className="text-white font-bold text-base">A</span>
        </div>
        
        <h1 className="text-[22px] font-semibold text-[#111827] text-center mt-4">Apollo OPD</h1>
        <p className="text-[14px] text-[#9ca3af] text-center mt-1">Patient Portal</p>

        {step === 1 ? (
          /* STEP 1: Phone input */
          <form onSubmit={handlePhoneSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-[13px] font-medium text-[#374151]">Phone number</label>
              <div className="flex mt-2">
                <span className="bg-[#f3f4f6] border border-[#e5e7eb] rounded-l-lg px-3 flex items-center text-[14px] text-[#6b7280] select-none">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="border border-[#e5e7eb] border-l-0 rounded-r-lg px-3 py-3 text-[14px] outline-none focus:border-[#1b504c] focus:ring-1 focus:ring-[#1b504c]/10 flex-1 w-full text-[#111827]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1b504c] text-white text-[15px] font-medium py-3 rounded-xl hover:bg-[#133b38] transition-colors duration-150 cursor-pointer"
            >
              Continue
            </button>

            <p className="text-[12px] text-[#9ca3af] text-center mt-3 leading-normal">
              By continuing, you agree to our Terms & Privacy Policy
            </p>

            <div className="border-t border-[#f3f4f6] pt-4 mt-4">
              <p className="text-center text-[14px] text-[#9ca3af]">
                Hospital staff?
                <Link to="/staff/login" className="text-[#1b504c] font-medium hover:underline"> Login here</Link>
              </p>
            </div>
          </form>
        ) : (
          /* STEP 2: OTP Verification */
          <form onSubmit={handleVerify} className="mt-6 space-y-4">
            <p className="text-[14px] text-[#6b7280]">
              Enter the 6-digit code sent to <b className="text-[#111827]">+91 {phoneNumber || "98765 43210"}</b>
            </p>

            {/* OTP inputs */}
            <div className="flex gap-2 mt-4 justify-center">
              {otpValues.map((val, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  required
                  value={val}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-12 h-12 border border-[#e5e7eb] rounded-xl text-center text-[18px] font-semibold text-[#111827] outline-none focus:border-[#1b504c] focus:ring-1 focus:ring-[#1b504c]/10 bg-white"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1b504c] text-white text-[15px] font-medium py-3 rounded-xl hover:bg-[#133b38] transition-colors duration-150 cursor-pointer"
            >
              Verify
            </button>

            <div className="text-center mt-3">
              {counter > 0 ? (
                <p className="text-[14px] text-[#9ca3af]">Resend code in {counter}s</p>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setCounter(28);
                    setOtpValues(["", "", "", "", "", ""]);
                  }}
                  className="text-[14px] text-[#1b504c] hover:underline cursor-pointer font-medium"
                >
                  Resend code
                </button>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
