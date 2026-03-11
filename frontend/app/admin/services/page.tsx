'use client';

import React, { useState } from 'react';

// دیتای اولیه
const initialServices = [
    { id: 1, name: 'Taglio Capelli', duration: '30 min', price: '25', icon: '✂️', description: 'Taglio classico, sfumatura moderna o a macchinetta.' },
    { id: 2, name: 'Regolazione Barba', duration: '20 min', price: '15', icon: '🧔', description: 'Modellatura barba con panno caldo e rasoio.' },
    { id: 3, name: 'Colore e Taglio', duration: '90 min', price: '60', icon: '🎨', description: 'Colorazione completa, lavaggio e taglio personalizzato.' },
    { id: 4, name: 'Taglio Bambino', duration: '30 min', price: '18', icon: '🧒', description: 'Taglio per bambini fino a 12 anni con styling.' },
    { id: 5, name: 'Trattamento Viso', duration: '45 min', price: '35', icon: '💆‍♂️', description: 'Pulizia del viso profonda, scrub e maschera rilassante.' },
];

export default function ServicesPage() {
    // استیت برای لیست خدمات (که بتونیم تغییرش بدیم)
    const [services, setServices] = useState(initialServices);

    // استیت‌های مربوط به مودال ویرایش
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState<'price' | 'duration' | null>(null);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [inputValue, setInputValue] = useState('');

    // تابع باز کردن مودال
    const openEditModal = (service: any, mode: 'price' | 'duration') => {
        setSelectedService(service);
        setEditMode(mode);
        setInputValue(mode === 'price' ? service.price : service.duration);
        setIsModalOpen(true);
    };

    // تابع ذخیره تغییرات
    const handleSave = () => {
        setServices(services.map(s => {
            if (s.id === selectedService.id) {
                return {
                    ...s,
                    [editMode === 'price' ? 'price' : 'duration']: inputValue
                };
            }
            return s;
        }));
        setIsModalOpen(false); // بستن مودال بعد از ذخیره
    };

    // تابع حذف سرویس (فقط برای نمایش ظاهری)
    const handleDelete = (id: number) => {
        if (confirm('Sei sicuro di voler eliminare questo servizio? (آیا از حذف مطمئن هستید؟)')) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-10">

            {/* هدر */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-[#1A1F2B] tracking-tight">Gestione Servizi</h1>
                    <p className="text-gray-500 font-medium mt-1">Aggiungi, modifica prezzi e durata dei tuoi servizi.</p>
                </div>
                <button className="bg-[#1A1F2B] text-white font-bold py-3 px-6 rounded-2xl hover:bg-black transition-all shadow-md hover:-translate-y-1 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                    Nuovo Servizio
                </button>
            </div>

            {/* لیست کارت‌ها */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group flex flex-col">

                        <div className="flex justify-between items-start mb-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-gray-50">
                                {service.icon}
                            </div>
                            <span className="text-2xl font-black text-[#D4A373] bg-[#D4A373]/10 px-3 py-1 rounded-xl">
                                € {service.price}
                            </span>
                        </div>

                        <h3 className="text-lg font-black text-[#1A1F2B] mb-2">{service.name}</h3>
                        <p className="text-sm font-medium text-gray-500 mb-6 flex-1">{service.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                            <div className="flex items-center text-sm font-bold text-gray-400">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span className="text-[#1A1F2B]">{service.duration}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                {/* دکمه تغییر زمان */}
                                <button onClick={() => openEditModal(service, 'duration')} title="Modifica Durata" className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-500 hover:text-white rounded-xl transition-all shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                                {/* دکمه تغییر قیمت */}
                                <button onClick={() => openEditModal(service, 'price')} title="Modifica Prezzo" className="p-2 text-green-500 bg-green-50 hover:bg-green-500 hover:text-white rounded-xl transition-all shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </button>
                                {/* دکمه حذف */}
                                <button onClick={() => handleDelete(service.id)} title="Elimina" className="p-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* مودال (پنجره پاپ‌آپ) ویرایش */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1F2B]/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-fade-in">

                        <h3 className="text-xl font-black text-[#1A1F2B] mb-1">
                            {editMode === 'price' ? 'Modifica Prezzo' : 'Modifica Durata'}
                        </h3>
                        <p className="text-sm font-bold text-gray-400 mb-6">{selectedService?.name}</p>

                        <div className="mb-6 relative">
                            {/* اگه قیمت بود علامت یورو بذار کنارش */}
                            {editMode === 'price' && (
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">€</span>
                            )}
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className={`w-full bg-[#F8F9FA] border-2 border-transparent rounded-2xl py-3 pr-4 focus:bg-white focus:border-[#D4A373] outline-none font-black text-[#1A1F2B] text-lg ${editMode === 'price' ? 'pl-8' : 'pl-4'}`}
                                placeholder={editMode === 'price' ? "0.00" : "es. 45 min"}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                            >
                                Annulla
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex-1 py-3 bg-[#D4A373] text-white rounded-2xl font-bold hover:bg-[#c29161] shadow-lg transition-all hover:-translate-y-0.5"
                            >
                                Salva
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}