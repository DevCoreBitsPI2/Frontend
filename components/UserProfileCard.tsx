'use client';

import React, { useState } from 'react';
import { MapPin, Briefcase, Mail, Phone, Calendar, Building2, Users, Edit3, Archive } from 'lucide-react';

interface UserProfile {
  idFuncionario: number;
  nombre: string;
  apellidos: string;
  cargo: string;
  area: string;
  email: string;
  phone: string;
  fechaIngreso: string;
  ubicacion: string;
  foto: string;
  estado: 'ACTIVO' | 'INACTIVO';
  fechaNacimiento: string;
  oficina: string;
  reportaA: string;
}

interface UserProfileCardProps {
  user: UserProfile;
  onEdit?: () => void;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onEdit }) => {
  const [activeTab, setActiveTab] = useState<'trayectoria' | 'contratos' | 'desempeño'>('trayectoria');

  return (
    <div className="min-h-screen bg-platinum-100">
      {/* Header del Perfil */}
      <div className="bg-white border-b border-platinum-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between gap-8">
            {/* Foto y datos principales */}
            <div className="flex items-start gap-6 flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src={user.foto || '/avatar-placeholder.png'}
                  alt={`${user.nombre} ${user.apellidos}`}
                  className="w-20 h-20 rounded-lg object-cover border-4 border-pale-sky-500 shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 bg-ink-black-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>

              <div className="pt-1 flex-1">
                <h1 className="text-3xl font-bold text-jet-black-900">
                  {user.nombre} {user.apellidos}
                </h1>
                <p className="text-platinum-700 font-medium mt-1">{user.cargo} • {user.area}</p>
                <div className="flex gap-6 mt-4 text-sm text-platinum-700">
                  <span className="flex items-center gap-2">
                    <span className="text-platinum-600 font-semibold">EMP-{user.idFuncionario}-A</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-platinum-600" />
                    Joined {new Date(user.fechaIngreso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-platinum-600" />
                    {user.ubicacion}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onEdit}
              className="px-5 py-2 bg-white border-2 border-platinum-300 text-jet-black-900 rounded-lg hover:bg-platinum-50 transition-colors flex items-center gap-2 font-medium flex-shrink-0"
            >
              <Edit3 className="w-4 h-4" />
              Edit Information
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-platinum-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'trayectoria', label: 'Career Path', icon: '◆' },
              { id: 'contratos', label: 'Contracts', icon: '□' },
              { id: 'desempeño', label: 'Performance', icon: '▽' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-1 py-4 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-jet-black-800 text-jet-black-900'
                    : 'border-transparent text-platinum-600 hover:text-jet-black-900'
                }`}
              >
                <span className="text-xs">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Contenido del tab - Columna izquierda */}
          <div className="col-span-2">
            {activeTab === 'trayectoria' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-lg font-bold text-jet-black-900 mb-8">Career Timeline</h2>
                <div className="space-y-8">
                  {/* Timeline Items */}
                  {[
                    {
                      fecha: 'JAN 2024',
                      titulo: 'Promotion to Senior Architect',
                      area: 'ENGINEERING HUB',
                      descripcion: 'Transitioned to leadership role overseeing cloud infrastructure modernization projects across North American regions.',
                      icon: '●'
                    },
                    {
                      fecha: 'JUNE 2021',
                      titulo: 'Transferred to Cloud Division',
                      area: 'STRATEGIC INFRASTRUCTURE',
                      descripcion: 'Departmental move to align with corporate-wide transition towards serverless architecture.',
                      icon: '◆'
                    },
                    {
                      fecha: 'MARCH 2019',
                      titulo: 'Joined as Junior Developer',
                      area: 'CORE PLATFORMS',
                      descripcion: 'Onboarded into the graduate development program focused on legacy system maintenance.',
                      icon: '■'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-10 h-10 bg-pale-sky-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {item.icon}
                        </div>
                        {idx < 2 && <div className="w-0.5 h-24 bg-platinum-300 mt-4" />}
                      </div>
                      <div className="pb-4 pt-1 flex-1">
                        <p className="text-xs font-bold text-platinum-600 uppercase tracking-wider">{item.fecha} · {item.area}</p>
                        <h3 className="text-base font-bold text-jet-black-900 mt-2">{item.titulo}</h3>
                        <p className="text-sm text-platinum-700 mt-2 leading-relaxed">{item.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contratos' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-lg font-bold text-jet-black-900 mb-6">Contracts</h2>
                <p className="text-platinum-700 text-center py-12">No contracts available at this time.</p>
              </div>
            )}

            {activeTab === 'desempeño' && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-lg font-bold text-jet-black-900 mb-6">Performance Evaluations</h2>
                <p className="text-platinum-700 text-center py-12">No performance evaluations available at this time.</p>
              </div>
            )}
          </div>

          {/* Panel derecho - Información y Tarjeta Digital */}
          <div className="space-y-6">
            {/* Información Personal */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-platinum-200">
                <span className="text-lg">📋</span>
                <h3 className="font-bold text-jet-black-900">Personal Info</h3>
              </div>
              <div className="space-y-5 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-platinum-600 uppercase text-xs font-bold tracking-wider mb-2">Email</p>
                    <p className="text-jet-black-800 font-medium text-xs break-words">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-platinum-600 uppercase text-xs font-bold tracking-wider mb-2">Phone Number</p>
                    <p className="text-jet-black-800 font-medium text-xs">{user.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-platinum-600 uppercase text-xs font-bold tracking-wider mb-2">Job Role</p>
                    <p className="text-jet-black-800 font-medium text-xs">{user.cargo}</p>
                  </div>
                  <div>
                    <p className="text-platinum-600 uppercase text-xs font-bold tracking-wider mb-2">Department</p>
                    <p className="text-jet-black-800 font-medium text-xs">{user.area}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-platinum-600 uppercase text-xs font-bold tracking-wider mb-2">Birth Date</p>
                    <p className="text-jet-black-800 font-medium text-xs">
                      {new Date(user.fechaNacimiento).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-platinum-600 uppercase text-xs font-bold tracking-wider mb-2">Office Location</p>
                    <p className="text-jet-black-800 font-medium text-xs">{user.oficina}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-platinum-200">
                  <p className="text-platinum-600 uppercase text-xs font-bold tracking-wider mb-2">Reports To</p>
                  <p className="text-jet-black-800 font-medium text-xs">{user.reportaA}</p>
                </div>
              </div>
            </div>

            {/* Tarjeta de Pase Digital */}
            <div className="bg-gradient-to-br from-jet-black-800 via-charcoal-blue-800 to-jet-black-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-5 rounded-full -ml-8 -mb-8"></div>

              <div className="relative z-10">
                <div className="text-right mb-6">
                  <span className="text-xs opacity-60 font-semibold tracking-wider">EMPLOYEE DIGITAL PASS</span>
                </div>

                <div className="bg-white rounded-lg p-4 mb-6 flex items-center justify-center h-32 shadow-lg">
                  <div className="w-28 h-28 bg-platinum-200 rounded flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-1 p-3">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-sm ${
                            [0, 2, 4, 6, 8].includes(i) ? 'bg-jet-black-900' : 'bg-platinum-400'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center border-t border-white border-opacity-20 pt-4">
                  <p className="font-bold text-base uppercase tracking-wide">
                    {user.nombre} {user.apellidos}
                  </p>
                  <p className="text-xs opacity-60 mt-2 font-medium">
                    ID {user.idFuncionario}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
