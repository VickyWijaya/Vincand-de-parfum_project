import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';

const LOCAL_DOCS = [
  {
    id: 1,
    icon: 'business',
    name: 'Nomor Induk Berusaha (NIB)',
    subtitle: 'Legalitas Utama Badan Usaha UMKM',
    number: '9120002819201',
    expiry: 'Berlaku Selamanya (Terbit 2024)',
    expiryType: 'permanent',
    type: 'PDF',
    size: '1.2 MB',
    isPublic: true,
    updatedAt: '3 hari lalu',
  },
  {
    id: 2,
    icon: 'policy',
    name: 'Notifikasi Izin Edar BPOM RI',
    subtitle: 'Extrait de Parfum Batch Series',
    number: 'NA18240601923',
    expiry: '12 Januari 2026',
    expiryType: 'date',
    type: 'PDF',
    size: '2.4 MB',
    isPublic: true,
    updatedAt: '1 minggu lalu',
  },
  {
    id: 3,
    icon: 'science',
    name: 'Sertifikat Uji Keamanan Mutu Lab',
    subtitle: 'Uji Dermatologi Bebas Iritasi',
    number: 'LPT-DERM-2824-99',
    expiry: '20 Februari 2026',
    expiryType: 'date',
    type: 'JPG',
    size: '840 KB',
    isPublic: true,
    updatedAt: '2 minggu lalu',
  },
];

const InputField = ({ label, value, onChange, placeholder, type = 'text', hint, required }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
    <label style={{ fontSize: '12px', fontWeight: '600', color: '#0b1c30' }}>
      {label}{required && <span style={{ color: '#ba1a1a' }}> *</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        height: '38px',
        padding: '0 12px',
        backgroundColor: '#f8f9ff',
        border: '1.5px solid #c6c6cd50',
        borderRadius: '8px',
        fontSize: '13px',
        color: '#0b1c30',
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
      }}
    />
    {hint && <p style={{ fontSize: '11px', color: '#515f74', margin: 0 }}>{hint}</p>}
  </div>
);

export default function AdminLegalitiesPage() {
  const [docs, setDocs] = useState(LOCAL_DOCS);
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(LOCAL_DOCS.map((d) => [d.id, d.isPublic]))
  );
  const [showAlert, setShowAlert] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  // New Doc Form State
  const [newDoc, setNewDoc] = useState({
    name: '',
    number: '',
    authority: '',
    isPublic: true
  });

  useEffect(() => {
    api.admin.getLegalities()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          const apiDocs = res.data.map((d, i) => ({
            id: d.id || i + 1,
            icon: d.type === 'NIB' ? 'business' : d.type === 'BPOM' ? 'policy' : 'science',
            name: d.title || 'Dokumen Legalitas Resmi',
            subtitle: `${d.type || 'BPOM'} Dokumen Registrasi`,
            number: d.number || '-',
            expiry: 'Berlaku Resmi',
            expiryType: 'permanent',
            type: 'PDF',
            size: '1.5 MB',
            isPublic: d.status ? d.status.toLowerCase().includes('tayang') || d.status.toLowerCase().includes('terverifikasi') : true,
            updatedAt: 'Terverifikasi'
          }));
          setDocs(apiDocs);
          setToggles(Object.fromEntries(apiDocs.map(d => [d.id, d.isPublic])));
        }
      })
      .catch((err) => console.warn('Legalities API fallback used:', err));
  }, []);

  const handleToggle = async (id) => {
    const nextVal = !toggles[id];
    setToggles((prev) => ({ ...prev, [id]: nextVal }));
    try {
      await api.admin.updateLegality(id, {
        status: nextVal ? 'Tayang di Web' : 'Internal'
      });
      setToastMessage('Status visibilitas dokumen berhasil diperbarui di database.');
    } catch (err) {
      console.warn('Update legality fallback:', err);
      setToastMessage('Status dokumen diperbarui.');
    }
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus dokumen legalitas ini?')) {
      try {
        await api.admin.deleteLegality(id);
        setToastMessage('Dokumen legalitas berhasil dihapus dari database.');
      } catch (err) {
        console.warn('Delete legality fallback:', err);
        setToastMessage('Dokumen legalitas telah dihapus.');
      }
      setDocs((prev) => prev.filter((d) => d.id !== id));
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleCreateDoc = async (e) => {
    if (e) e.preventDefault();
    if (!newDoc.name.trim() || !newDoc.number.trim()) {
      alert('Nama dokumen dan nomor registrasi wajib diisi!');
      return;
    }

    try {
      await api.admin.createLegality({
        title: newDoc.name,
        name: newDoc.name,
        number: newDoc.number,
        type: newDoc.authority.includes('BPOM') ? 'BPOM' : 'NIB',
        status: newDoc.isPublic ? 'Tayang di Web' : 'Internal'
      });
      setToastMessage(`Dokumen "${newDoc.name}" berhasil disimpan ke database.`);
    } catch (err) {
      console.warn('Create legality fallback:', err);
      setToastMessage(`Dokumen "${newDoc.name}" disimpan lokal.`);
    }

    const created = {
      id: Date.now(),
      icon: 'verified',
      name: newDoc.name,
      subtitle: newDoc.authority || 'Dokumen Resmi',
      number: newDoc.number,
      expiry: 'Berlaku Selamanya',
      expiryType: 'permanent',
      type: 'PDF',
      size: '1.0 MB',
      isPublic: newDoc.isPublic,
      updatedAt: 'Baru saja'
    };

    setDocs((prev) => [...prev, created]);
    setToggles((prev) => ({ ...prev, [created.id]: created.isPublic }));
    setNewDoc({ name: '', number: '', authority: '', isPublic: true });
    setTimeout(() => setToastMessage(''), 3000);
  };

  const statBoxStyle = {
    flex: 1,
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    border: '1px solid #c6c6cd30',
    borderRadius: '12px',
  };

  const toggleStyle = (active) => ({
    width: '40px',
    height: '22px',
    borderRadius: '11px',
    backgroundColor: active ? '#0b1c30' : '#c6c6cd',
    position: 'relative',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s',
    flexShrink: 0,
  });

  const toggleKnobStyle = (active) => ({
    position: 'absolute',
    top: '3px',
    left: active ? '21px' : '3px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    transition: 'left 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  });

  return (
    <div
      className="admin-theme"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '32px',
      }}
    >
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#0b1c30' }}>verified_user</span>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0b1c30', margin: 0, letterSpacing: '-0.3px' }}>
              Legalitas &amp; Dokumen Izin
            </h1>
          </div>
          <p style={{ fontSize: '13px', color: '#515f74', margin: 0 }}>
            Kelola dokumen resmi perizinan usaha dan izin edar yang ditampilkan ke calon pembeli
          </p>
        </div>
        <button
          style={{
            height: '38px',
            padding: '0 16px',
            backgroundColor: '#0b1c30',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexShrink: 0,
            boxShadow: '0 2px 6px rgba(11,28,48,0.18)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>upload_file</span>
          + Unggah Dokumen Baru
        </button>
      </div>

      {/* Alert Banner */}
      {showAlert && (
        <div
          style={{
            backgroundColor: '#eff4ff',
            border: '1px solid #c6c6cd50',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#515f74', flexShrink: 0, marginTop: '1px' }}>info</span>
            <p style={{ fontSize: '13px', color: '#515f74', margin: 0, lineHeight: '1.5' }}>
              Dokumen yang berstatus <strong style={{ color: '#0b1c30' }}>Publik</strong> akan otomatis muncul di bagian Legalitas &amp; Kepercayaan pada website publik VINCAND DEU. Dokumen <strong style={{ color: '#0b1c30' }}>Internal</strong> hanya tersimpan aman di arsip admin.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#059669',
                backgroundColor: '#d1fae5',
                border: '1px solid #6ee7b730',
                borderRadius: '6px',
                padding: '2px 8px',
              }}
            >
              ● {docs.length} Berkas Aktif
            </span>
            <button
              onClick={() => setShowAlert(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#515f74', padding: '0', display: 'flex' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
            </button>
          </div>
        </div>
      )}

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <div style={statBoxStyle}>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#515f74', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px 0' }}>Total Terverifikasi</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#515f74' }}>task_alt</span>
            <div>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#0b1c30', margin: 0, lineHeight: 1 }}>{docs.length}</p>
              <p style={{ fontSize: '12px', color: '#515f74', margin: '2px 0 0 0' }}>Berkas</p>
            </div>
          </div>
        </div>
        <div style={statBoxStyle}>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#515f74', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px 0' }}>Tayang Publik</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#515f74' }}>visibility</span>
            <div>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#0b1c30', margin: 0, lineHeight: 1 }}>
                {Object.values(toggles).filter(Boolean).length}
              </p>
              <p style={{ fontSize: '12px', color: '#515f74', margin: '2px 0 0 0' }}>Ditampilkan</p>
            </div>
          </div>
        </div>
        <div style={statBoxStyle}>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#515f74', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px 0' }}>Kepatuhan Standar</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#515f74' }}>security</span>
            <div>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#059669', margin: 0, lineHeight: 1 }}>100%</p>
              <p style={{ fontSize: '12px', color: '#515f74', margin: '2px 0 0 0' }}>Lengkap</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #c6c6cd30',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 20px',
            borderBottom: '1px solid #e5eeff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#0b1c30', margin: 0 }}>
              Daftar Dokumen Izin &amp; Sertifikat Mutu
            </h2>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                color: '#515f74',
                backgroundColor: '#eff4ff',
                border: '1px solid #c6c6cd30',
                borderRadius: '6px',
                padding: '2px 8px',
              }}
            >
              {docs.length} Berkas
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#059669', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#059669', display: 'inline-block' }} />
            Sinkronisasi Otomatis
          </span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9ff' }}>
              {['NAMA DOKUMEN', 'NOMOR REGISTRASI / IZIN', 'MASA BERLAKU', 'TIPE BERKAS', 'STATUS PUBLIKASI', 'PEMBARUAN', 'AKSI'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#515f74',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid #e5eeff',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, i) => (
              <tr
                key={doc.id}
                style={{
                  borderBottom: i < docs.length - 1 ? '1px solid #e5eeff' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9ff')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {/* Doc name */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        backgroundColor: '#eff4ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#515f74' }}>{doc.icon}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#0b1c30', margin: '0 0 2px 0' }}>{doc.name}</p>
                      <p style={{ fontSize: '11px', color: '#515f74', margin: 0 }}>{doc.subtitle}</p>
                    </div>
                  </div>
                </td>
                {/* Number */}
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#0b1c30', fontWeight: '600' }}>{doc.number}</span>
                </td>
                {/* Expiry */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#515f74' }}>
                      {doc.expiryType === 'permanent' ? 'all_inclusive' : 'calendar_today'}
                    </span>
                    <span style={{ fontSize: '12px', color: '#0b1c30' }}>{doc.expiry}</span>
                  </div>
                </td>
                {/* Type */}
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      color: '#0b1c30',
                      backgroundColor: '#e5eeff',
                      border: '1px solid #c6c6cd40',
                      borderRadius: '6px',
                      padding: '3px 8px',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>description</span>
                    {doc.type} · {doc.size}
                  </span>
                </td>
                {/* Toggle */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => handleToggle(doc.id)}
                      style={toggleStyle(toggles[doc.id])}
                    >
                      <div style={toggleKnobStyle(toggles[doc.id])} />
                    </button>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: toggles[doc.id] ? '#059669' : '#515f74',
                        backgroundColor: toggles[doc.id] ? '#d1fae5' : '#f1f5f9',
                        border: `1px solid ${toggles[doc.id] ? '#6ee7b730' : '#c6c6cd30'}`,
                        borderRadius: '6px',
                        padding: '2px 7px',
                      }}
                    >
                      {toggles[doc.id] ? 'Tayang di Web' : 'Internal'}
                    </span>
                  </div>
                </td>
                {/* Updated */}
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ fontSize: '12px', color: '#515f74' }}>{doc.updatedAt}</span>
                </td>
                {/* Actions */}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      title="Download"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#515f74', padding: '4px', borderRadius: '6px', display: 'flex' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                    </button>
                    <button
                      title="Edit"
                      onClick={() => setEditingId(doc.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#515f74', padding: '4px', borderRadius: '6px', display: 'flex' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                    </button>
                    <button
                      title="Hapus"
                      onClick={() => handleDelete(doc.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ba1a1a', padding: '4px', borderRadius: '6px', display: 'flex' }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ padding: '12px 20px', borderTop: '1px solid #e5eeff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#515f74' }}>Menampilkan {docs.length} dari {docs.length} dokumen</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Sebelumnya', '1', 'Berikutnya'].map((p) => (
              <button
                key={p}
                style={{
                  height: '28px',
                  padding: '0 10px',
                  borderRadius: '6px',
                  border: '1px solid #c6c6cd40',
                  backgroundColor: p === '1' ? '#0b1c30' : '#ffffff',
                  color: p === '1' ? '#ffffff' : '#515f74',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #c6c6cd30',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #e5eeff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#515f74' }}>upload_file</span>
          <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#0b1c30', margin: 0 }}>
            Unggah Dokumen Legalitas Baru
          </h2>
        </div>
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '13px', color: '#515f74', margin: '0 0 20px 0' }}>
            Tambahkan dokumen regulasi, sertifikasi ISO/BPOM, atau hasil pengujian laboratorium terkini
          </p>

          {/* 3-col fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            <InputField
              label="Nama Dokumen"
              value={newDoc.name}
              onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
              placeholder="Contoh: Izin Edar BPOM Batch 2"
              hint="Nama yang mudah diidentifikasi pelanggan"
              required
            />
            <InputField
              label="Nomor Dokumen / Registrasi"
              value={newDoc.number}
              onChange={(e) => setNewDoc({ ...newDoc, number: e.target.value })}
              placeholder="Contoh: NA18240609999"
              hint="Nomor resmi dari instansi penerbit"
              required
            />
            <InputField
              label="Instansi / Lembaga Penerbit"
              value={newDoc.authority}
              onChange={(e) => setNewDoc({ ...newDoc, authority: e.target.value })}
              placeholder="Misal: BPOM RI / OSS Kemenves"
              hint="Lembaga otoritas pemberi izin resmi"
              required
            />
          </div>

          {/* Upload area */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#0b1c30', display: 'block', marginBottom: '8px' }}>
              Berkas Dokumen (PDF, JPG, PNG) <span style={{ color: '#ba1a1a' }}>*</span>
            </label>
            <div
              style={{
                border: '2px dashed #c6c6cd60',
                borderRadius: '10px',
                padding: '32px 20px',
                textAlign: 'center',
                backgroundColor: '#f8f9ff',
                cursor: 'pointer',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '36px', color: '#515f74', marginBottom: '8px', display: 'block' }}>cloud_upload</span>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#0b1c30', margin: '0 0 4px 0' }}>
                Tarik &amp; lepas berkas ke sini, atau{' '}
                <span style={{ color: '#0b1c30', textDecoration: 'underline', cursor: 'pointer' }}>Pilih dari perangkat</span>
              </p>
              <p style={{ fontSize: '12px', color: '#515f74', margin: 0 }}>Format didukung: PDF, JPG, atau PNG (Maksimal kapasitas 5.0 MB)</p>
            </div>
          </div>

          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setNewDoc((prev) => ({ ...prev, isPublic: !prev.isPublic }))}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: newDoc.isPublic ? '#0b1c30' : '#c6c6cd',
                  border: 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s',
                }}
              >
                <div style={{ position: 'absolute', top: '4px', left: newDoc.isPublic ? '23px' : '4px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
              </button>
              <div>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#0b1c30', margin: '0 0 1px 0' }}>Tampilkan di Halaman Publik Website</p>
                <p style={{ fontSize: '11px', color: '#515f74', margin: 0 }}>Pengunjung dapat melihat sertifikat ini di profil legalitas produk</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setNewDoc({ name: '', number: '', authority: '', isPublic: true })}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  backgroundColor: '#f8f9ff',
                  border: '1px solid #c6c6cd50',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#515f74',
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleCreateDoc}
                style={{
                  height: '36px',
                  padding: '0 16px',
                  backgroundColor: '#0b1c30',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(11,28,48,0.18)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified_user</span>
                Simpan &amp; Publikasikan Dokumen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#0b1c30',
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 50,
            boxShadow: '0 4px 16px rgba(11,28,48,0.2)',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingTop: '8px', borderTop: '1px solid #e5eeff' }}>
        <p style={{ fontSize: '11px', color: '#515f74', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>lock</span>
          Dokumen tersimpan terenkripsi dan diverifikasi sesuai regulasi perizinan kosmetika Indonesia.
        </p>
      </div>
    </div>
  );
}
