import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Mengirim Pesan...',
      html: 'Harap tunggu selagi kami mengirim pesan Anda',
      allowOutsideClick: false,
      background: '#1a1a1a',
      color: '#fff',
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const formSubmitUrl = 'https://formsubmit.co/hyoouka950@gmail.com';
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('message', formData.message);
      submitData.append('_subject', 'Pesan Baru dari Website Portfolio');
      submitData.append('_captcha', 'false');
      submitData.append('_template', 'table');

      await axios.post(formSubmitUrl, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      Swal.fire({
        title: 'Berhasil!',
        text: 'Pesan Anda telah berhasil terkirim!',
        icon: 'success',
        confirmButtonColor: '#4b5563',
        background: '#1a1a1a',
        color: '#fff',
        timer: 2000,
        timerProgressBar: true
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error.request && error.request.status === 0) {
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pesan Anda telah berhasil terkirim!',
          icon: 'success',
          confirmButtonColor: '#4b5563',
          background: '#1a1a1a',
          color: '#fff',
          timer: 2000,
          timerProgressBar: true
        });

        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          title: 'Gagal!',
          text: 'Terjadi kesalahan. Silakan coba lagi nanti.',
          icon: 'error',
          confirmButtonColor: '#4b5563',
          background: '#1a1a1a',
          color: '#fff'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] sm:px-[5%] lg:px-[10%] flex justify-center items-center flex-col pb-10">
      
      <div className="text-center lg:mt-[5%] mt-10 mb-8 sm:px-0 px-[5%] w-full">
        <h2 data-aos="fade-down" data-aos-duration="1000" className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Hubungi Saya
        </h2>
        <p data-aos="fade-up" data-aos-duration="1100" className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
        </p>
      </div>

      <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-7xl overflow-hidden" id="Contact">
        {/* Glow background effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-8 p-6 lg:p-10 relative z-10">
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 py-10 sm:p-10 transition-all duration-500 hover:shadow-white/5">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Hubungi
                </h2>
                <p className="text-gray-400">
                  Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-gray-400 opacity-50" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/5 rounded-xl border border-white/10 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:border-white/20 disabled:opacity-50"
                  required
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/5 rounded-xl border border-white/10 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:border-white/20 disabled:opacity-50"
                  required
                />
              </div>
              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/5 rounded-xl border border-white/10 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 hover:border-white/20 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>
              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                {/* MENGUBAH bg-gradient... MENJADI TEMA MONOKROM GLASS */}
                className="w-full bg-white/10 border border-white/20 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 py-3 md:p-10 md:py-8 transition-all duration-500 hover:shadow-white/5">
            <Komentar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;