import React, { useState } from 'react';

const From = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    registrationNumber: '',
    title: '',
    category: '',
    description: '',
    location: '',
    date: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = 'Name is required';
    if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'Valid email required';
    if (!values.registrationNumber.trim()) e.registrationNumber = 'Registration number is required';
    if (!values.title.trim()) e.title = 'Title is required';
    if (!values.category) e.category = 'Please select Lost or Found';
    if (!values.description.trim()) e.description = 'Description is required';
    if (!values.location.trim()) e.location = 'Location is required';
    if (!values.date) e.date = 'Date is required';
    return e;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      handleFile(files[0]);
    } else {
      setValues((v) => ({ ...v, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setValues((v) => ({ ...v, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;

    setStatus('submitting');
    
    // Format data according to item structure
    const submissionData = {
      id: Date.now(), // Generate unique ID
      title: values.title,
      description: values.description,
      category: values.category,
      image: preview, // Use preview URL or upload to server
      location: values.location,
      date: values.date,
      contactName: values.name,
      contactEmail: values.email,
      registrationNumber: values.registrationNumber
    };
    
    console.log('Form submitted:', submissionData);
    
    setTimeout(() => {
      setStatus('success');
      setValues({ 
        name: '', 
        email: '', 
        registrationNumber: '',
        title: '', 
        category: '',
        description: '', 
        location: '',
        date: '',
        image: null 
      });
      setPreview(null);
    }, 1000);
  };

  return (
    <div className="w-full max-h-[85vh] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-4 bg-black/80 text-white font-[Inter] rounded-lg shadow-xl border border-white/10">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 bg-white bg-clip-text text-transparent">
            Report Lost/Found Item
          </h2>
          <p className="text-gray-400 text-sm">Fill in the details to help others find their belongings</p>
        </div>

        {/* Personal Information Section */}
        <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
            <i className="ri-user-line"></i>
            Personal Information
          </h3>
          
          <label className="block">
            <span className="text-sm font-medium mb-1 flex items-center gap-1">
              Name <span className="text-red-400">*</span>
            </span>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
              aria-invalid={!!errors.name}
              placeholder="John Doe"
            />
            {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium mb-1  flex items-center gap-1">
                Email <span className="text-red-400">*</span>
              </span>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                aria-invalid={!!errors.email}
                placeholder="john@example.com"
              />
              {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}
            </label>

            <label className="block">
              <span className="text-sm font-medium mb-1  flex items-center gap-1">
                Registration Number <span className="text-red-400">*</span>
              </span>
              <input
                name="registrationNumber"
                value={values.registrationNumber}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                aria-invalid={!!errors.registrationNumber}
                placeholder="2021CS001"
              />
              {errors.registrationNumber && <span className="text-red-400 text-xs mt-1 block">{errors.registrationNumber}</span>}
            </label>
          </div>
        </div>

        {/* Item Details Section */}
        <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
            <i className="ri-file-list-3-line"></i>
            Item Details
          </h3>

          <label className="block">
            <span className="text-sm font-medium mb-1  flex items-center gap-1">
              Title <span className="text-red-400">*</span>
            </span>
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all"
              aria-invalid={!!errors.title}
              placeholder="Black Leather Wallet"
            />
            {errors.title && <span className="text-red-400 text-xs mt-1 block">{errors.title}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium mb-1  flex items-center gap-1">
              Category <span className="text-red-400">*</span>
            </span>
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 cursor-pointer transition-all"
              aria-invalid={!!errors.category}
            >
              <option value="" disabled>-- Select Category --</option>
              <option value="lost"> Lost</option>
              <option value="found"> Found</option>
            </select>
            {errors.category && <span className="text-red-400 text-xs mt-1 block">{errors.category}</span>}
          </label>

          <label className="block">
            <span className="text-sm font-medium mb-1  flex items-center gap-1">
              Description <span className="text-red-400">*</span>
            </span>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 resize-none transition-all"
              rows="4"
              aria-invalid={!!errors.description}
              placeholder="Black leather wallet with multiple card slots. Last seen near the library. Contains ID cards and some cash."
            />
            {errors.description && <span className="text-red-400 text-xs mt-1 block">{errors.description}</span>}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium mb-1  flex items-center gap-1">
                <i className="ri-map-pin-line text-blue-400"></i>
                Location <span className="text-red-400">*</span>
              </span>
              <input
                name="location"
                value={values.location}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
                aria-invalid={!!errors.location}
                placeholder="Campus Library"
              />
              {errors.location && <span className="text-red-400 text-xs mt-1 block">{errors.location}</span>}
            </label>

            <label className="block">
              <span className="text-sm font-medium mb-1  flex items-center gap-1">
                <i className="ri-calendar-line text-blue-400"></i>
                Date <span className="text-red-400">*</span>
              </span>
              <input
                name="date"
                type="date"
                value={values.date}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-600 bg-gray-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                aria-invalid={!!errors.date}
              />
              {errors.date && <span className="text-red-400 text-xs mt-1 block">{errors.date}</span>}
            </label>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="block p-4 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2 mb-3">
            <i className="ri-image-line"></i>
            Photo (Optional)
          </h3>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all ${
              dragActive ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' : 'border-gray-600 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-400'
            }`}
          >
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {preview ? (
              <div className="space-y-3">
                <img src={preview} alt="Preview" className="mx-auto max-h-40 rounded-lg shadow-lg" />
                <p className="text-sm text-gray-400">Click or drag to replace image</p>
              </div>
            ) : (
              <div className="space-y-2">
                <i className="ri-upload-cloud-2-line text-4xl text-gray-400"></i>
                <p className="text-base text-gray-300 font-medium">Drag & drop an image here</p>
                <p className="text-xs text-gray-500">or click to browse</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <span className="flex items-center justify-center gap-2">
              <i className="ri-loader-4-line animate-spin"></i> Submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <i className="ri-send-plane-fill"></i> Submit Report
            </span>
          )}
        </button>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-400 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <i className="ri-checkbox-circle-line text-xl"></i>
            <span className="font-medium">Submitted successfully!</span>
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <i className="ri-error-warning-line text-xl"></i>
            <span className="font-medium">Submission failed. Please try again.</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default From;