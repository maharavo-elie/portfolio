import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Panel from '../components/Panel';
import Reveal from '../components/Reveal';

const fields = [
  { name: "name", label: "Nom", type: "text", placeholder: "Votre nom" },
  { name: "email", label: "Email", type: "email", placeholder: "Votre email" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // À brancher sur une API (Laravel, etc.)
    console.log("Message envoyé :", form);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <p className="font-mono text-[var(--accent)] text-sm">// contact</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Travaillons ensemble</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <Reveal>
          <Panel filename="contact.js">
            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block mb-2 text-sm text-[var(--text-muted)]">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full rounded-lg bg-[var(--bg)] border border-[var(--border)] p-3 text-sm focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>
              ))}

              <div>
                <label className="block mb-2 text-sm text-[var(--text-muted)]">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  required
                  className="w-full rounded-lg bg-[var(--bg)] border border-[var(--border)] p-3 text-sm resize-none focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--accent)] text-[#04342c] py-3 rounded-lg font-medium hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Envoyer
              </button>

              {sent && (
                <p className="text-[var(--accent)] text-sm font-mono">// message envoyé, merci !</p>
              )}
            </form>
          </Panel>
          </Reveal>

          <div className="flex flex-col justify-center">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-[var(--accent)]" />
                <span className="text-[var(--text-muted)]">maharavoelie@gmail.com</span>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-[var(--accent)]" />
                <span className="text-[var(--text-muted)]">Madagascar</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a href="https://github.com/TON_PSEUDO" target="_blank" rel="noreferrer"
                className="w-12 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-center hover:border-[var(--accent)] hover:scale-110 active:scale-95 transition-all">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/TON_PROFIL" target="_blank" rel="noreferrer"
                className="w-12 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-lg flex items-center justify-center hover:border-[var(--accent)] hover:scale-110 active:scale-95 transition-all">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
