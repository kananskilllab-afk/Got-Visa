import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { HiOutlineUser, HiOutlineGlobe, HiOutlinePhone, HiOutlineMail, HiOutlineAcademicCap, HiOutlineClipboardCheck, HiOutlineIdentification, HiOutlineUserGroup, HiOutlineHome, HiOutlineLocationMarker } from 'react-icons/hi';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import ImageUploader from './ImageUploader';
import { COUNTRIES, EXAM_TYPES } from '../../utils/constants';

const StudentForm = ({ initialData = null }) => {
  const navigate = useNavigate();
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    name: '',
    crmId: '',
    mobileNumber: '',
    currentMobileNumber: '',
    email: '',
    country: '',
    examType: '',
    result: '',
    currentFaculty: '',
    intake: '',
    collegeName: '',
    address: '',
    currentAddress: '',
    areaLandmark: '',
    pincode: '',
    program: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        crmId: initialData.crmId || '',
        mobileNumber: initialData.mobileNumber || '',
        currentMobileNumber: initialData.currentMobileNumber || '',
        email: initialData.email || '',
        country: initialData.country || '',
        examType: initialData.examType || '',
        result: initialData.result || '',
        currentFaculty: initialData.currentFaculty || '',
        intake: initialData.intake || '',
        collegeName: initialData.collegeName || '',
        address: initialData.address || '',
        currentAddress: initialData.currentAddress || '',
        areaLandmark: initialData.areaLandmark || '',
        pincode: initialData.pincode || '',
        program: initialData.program || '',
      });
      if (initialData.photo) setPreview(initialData.photo);
    }
  }, [initialData]);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreview('');
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.country) errs.country = 'Country is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) formData.append('photo', file);

      if (isEdit) {
        await api.put(`/students/${initialData._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Student updated successfully');
      } else {
        await api.post('/students', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Student added successfully');
      }
      navigate('/admin/students');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="max-w-3xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Photo */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-6"
          >
            <div className="bg-gradient-to-br from-primary/5 via-sky/5 to-secondary/5 rounded-3xl p-6 border border-primary/10">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-sky flex items-center justify-center">
                  <HiOutlineUser className="w-4 h-4 text-white" />
                </div>
                Student Photo
              </h3>
              <ImageUploader
                preview={preview}
                onFileSelect={handleFileSelect}
                onRemove={handleRemoveImage}
              />
              <p className="text-xs text-gray-400 font-medium mt-4 text-center">
                Upload a clear photo of the student
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Form Fields */}
        <div className="lg:col-span-2 space-y-5">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
          >
            <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2 text-lg">
              <HiOutlineUser className="w-5 h-5 text-primary" />
              Personal & Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
                <Input
                  label="Full Name *"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  error={errors.name}
                  placeholder="Enter student name"
                  icon={HiOutlineUser}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.13 }}>
                <Input
                  label="CRM ID"
                  value={form.crmId}
                  onChange={(e) => updateField('crmId', e.target.value)}
                  placeholder="Enter CRM ID"
                  icon={HiOutlineIdentification}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.15 }}>
                <Input
                  label="Primary Mobile"
                  value={form.mobileNumber}
                  onChange={(e) => updateField('mobileNumber', e.target.value)}
                  placeholder="Enter mobile number"
                  icon={HiOutlinePhone}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.17 }}>
                <Input
                  label="Current Mobile"
                  value={form.currentMobileNumber}
                  onChange={(e) => updateField('currentMobileNumber', e.target.value)}
                  placeholder="Enter current mobile number"
                  icon={HiOutlinePhone}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Enter email address"
                  icon={HiOutlineMail}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.25 }}>
                <Select
                  label="Country *"
                  value={form.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  error={errors.country}
                  icon={HiOutlineGlobe}
                  options={[{ value: '', label: 'Select Country' }, ...COUNTRIES.map((c) => ({ value: c, label: c }))]}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Academic Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
          >
            <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2 text-lg">
              <HiOutlineAcademicCap className="w-5 h-5 text-secondary" />
              Academic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
                <Input
                  label="College Name"
                  value={form.collegeName}
                  onChange={(e) => updateField('collegeName', e.target.value)}
                  placeholder="Enter college name"
                  icon={HiOutlineAcademicCap}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.32 }}>
                <Input
                  label="Program"
                  value={form.program}
                  onChange={(e) => updateField('program', e.target.value)}
                  placeholder="Enter program/course"
                  icon={HiOutlineAcademicCap}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.34 }}>
                <Input
                  label="Intake"
                  value={form.intake}
                  onChange={(e) => updateField('intake', e.target.value)}
                  placeholder="e.g. Sep 2024"
                  icon={HiOutlineAcademicCap}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.36 }}>
                <Select
                  label="Exam Type"
                  value={form.examType}
                  onChange={(e) => updateField('examType', e.target.value)}
                  icon={HiOutlineAcademicCap}
                  options={[{ value: '', label: 'Select Exam Type' }, ...EXAM_TYPES.map((v) => ({ value: v, label: v }))]}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.38 }}>
                <Input
                  label="Result / Score"
                  value={form.result}
                  onChange={(e) => updateField('result', e.target.value)}
                  placeholder="e.g. 7, 6.5, PTE - 59"
                  icon={HiOutlineClipboardCheck}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                <Input
                  label="Current Faculty"
                  value={form.currentFaculty}
                  onChange={(e) => updateField('currentFaculty', e.target.value)}
                  placeholder="Enter current faculty"
                  icon={HiOutlineUserGroup}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Address Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
          >
            <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2 text-lg">
              <HiOutlineHome className="w-5 h-5 text-lime" />
              Address Details
            </h3>
            <div className="grid grid-cols-1 gap-5">
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.45 }}>
                <Input
                  label="Permanent Address"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Enter permanent address"
                  icon={HiOutlineHome}
                />
              </motion.div>
              <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.47 }}>
                <Input
                  label="Current Address"
                  value={form.currentAddress}
                  onChange={(e) => updateField('currentAddress', e.target.value)}
                  placeholder="Enter current address"
                  icon={HiOutlineHome}
                />
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                  <Input
                    label="Area/Landmark"
                    value={form.areaLandmark}
                    onChange={(e) => updateField('areaLandmark', e.target.value)}
                    placeholder="Enter area or landmark"
                    icon={HiOutlineLocationMarker}
                  />
                </motion.div>
                <motion.div variants={fieldVariants} initial="hidden" animate="visible" transition={{ delay: 0.52 }}>
                  <Input
                    label="Pincode"
                    value={form.pincode}
                    onChange={(e) => updateField('pincode', e.target.value)}
                    placeholder="Enter pincode"
                    icon={HiOutlineLocationMarker}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 pt-4 border-t border-gray-100"
          >
            <Button type="submit" loading={loading} size="lg" className="flex-1 sm:flex-none">
              {isEdit ? 'Update Student' : 'Add Student'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={() => navigate('/admin/students')}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.form>
  );
};

export default StudentForm;
